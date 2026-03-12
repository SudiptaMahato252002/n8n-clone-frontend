'use client'
import { Button } from '@/components/ui/button'
import React, { use, useCallback, useEffect, useState } from 'react'
import { ReactFlow, Background, Controls,Node ,Edge, NodeChange, applyNodeChanges, OnNodesChange, EdgeChange, applyEdgeChanges,OnEdgesChange, Connection, addEdge, NodeTypes} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkflowNode from '@/components/custom/WorkflowNode';
import WebhookModal, { WebhookDataProps } from '@/components/custom/WebhookModal';
import { generateWebhookId, generateWebhookSecret } from '@/lib/WebhookUtils';
import { useAuth } from '@/contexts/AuthContext';
import ResendEmailModal from '@/components/custom/ResendEmailModal';
import GroqAIModal from '@/components/custom/GroqAIModal';
import { useParams } from 'next/navigation';
import { workflowApi } from '@/services/workflow.service';
import { Platform, WorkflowNodePayload } from '@/types';


type WorkflowNodeData = {
  label: string
  subtitle?: string
  type: Platform
  credentialsId?: string
  config: any
  onDelete: (id: string) => void
}

const nodeTypes:NodeTypes={
  workflow:WorkflowNode
}

const WorkflowCreateForm = () => {

  const params=useParams<{id:string}>()
  const workflowId=params.id
  const {user}=useAuth()

  const [nodes, setNodes] = useState<Node<WorkflowNodeData>[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [nodeCounter, setNodeCounter] = useState(0)
  const [isSaving,setIsSaving]=useState<boolean>(false)
  const [saveStatus,setSaveStatus]=useState<'idle'|'saved'|'error'>('idle')
  
  const [showSidebar, setShowSidebar] = useState(false)
  const [showWebhookModal,setShowWebhookModal]=useState(false)
  const [showResendEmailModal,setShowResendEmailModal]=useState(false)
  const [showGroqAIModal,setShowGroqAIModal]=useState(false)
  const [editingNodeId,setEditingNodeId]=useState<string|undefined>(undefined)
  
  const [webhookData,setWebhookData]=useState<any>(null)
  const [isGenerating,setIsGenerating]=useState(false)
  
  const [workflowData,setWorkflowData]=useState({
    title:'',
    triggerType:'MANUAL' as 'WEBHOOK'|'MANUAL'|'SCHEDULE',
    webhook:undefined as undefined|{
        id: string,
        title: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        secret: string,
        createdAt?: string
      }
  })

   const onDelete=useCallback((id:string)=>{
    setNodes((nds)=>nds.filter((n)=>n.id!==id))
    setEdges((eds)=>eds.filter((e)=>e.source!==id && e.target!==id))
  },[])

  useEffect(()=>{
    if(!workflowId||!user)
      return
    
    const loadWorkflow=async()=>{
      try 
      {
        const workflow= await workflowApi.getById(workflowId,user.id)
        setWorkflowData({
          title:workflow.title,
          triggerType:workflow.triggerType,
          webhook:workflow.webhook,
          
        })
        const loadedNodes:Node<WorkflowNodeData>[]=Object.values(workflow.nodes||{}).map((node:WorkflowNodePayload)=>({
          id:node.id,
          type: 'workflow',//FIX THIS
          position:node.position,//FIX THIS
          data:{
            label: node.label,
            subtitle: node.type,
            type:node.type,
            credentialsId: node.credentialsId,
            config:node.config,
            onDelete
          }
          
        }))

        setNodes(loadedNodes)

        const maxExisting=loadedNodes.reduce((max,n)=>{
          const num=parseInt(n.id.replace('n',''),10)
          return isNaN(num)?max:Math.max(max,num+1)
        },0)

        setNodeCounter(maxExisting)

        const loadedEdges: Edge[] = []

      Object.entries(workflow.connections || {}).forEach(
        ([source, targets]: any) => {
          targets.forEach((target: string) => {
            loadedEdges.push({
              id: `${source}-${target}`,
              source,
              target
            })
          })
        }
      )

      setEdges(loadedEdges)
      } catch (error) {
        console.error('Failed to load workflow', error)
      }
    }
    loadWorkflow()
  },[workflowId,user,onDelete])

  const addNodeNew=(type:Platform,label:string,subtitle:string,config:any)=>{
    const id=`n${nodeCounter}`
    const newNode:Node<WorkflowNodeData>={
      id,
      position:{ x: 250 + nodes.length * 40,
      y: 200 + nodes.length * 40},
      type:'workflow',
      data:{
        label,
        subtitle,
        type,
        credentialsId:config.credentialsId,
        config,
        onDelete
      }
    }
    setNodes((prev)=>[...prev,newNode])
    setNodeCounter((prev)=>prev+1)
  }
  
  const generateWebhookConfig=async()=>{
    setIsGenerating(true)
    try 
    {
      
      if(!user)
      {
        alert('Please login first')
        return
      }
      const webhookId= await generateWebhookId(user.id)
      const webhookSecret= generateWebhookSecret()
      
      const config={
        id: webhookId,
        title: 'Webhook Trigger',
        secret: webhookSecret,
        method: 'PUT' as const
      }

      const webhookInfo:WebhookDataProps={
        id:webhookId as string,
        secret: config.secret,
        title: config.title,
        method:config.method,
        url: `${window.location.origin}/webhooks/${webhookId}`
      }

      setWorkflowData((prev) => ({
      ...prev,
      triggerType: "WEBHOOK",
      webhook: config
    }))


      setWebhookData(webhookInfo)
      setShowWebhookModal(true)
      setShowSidebar(false)
      console.log('Webhook config generated (not saved yet):', config)

    } 
    catch (error) 
    {
      console.error('Error generating webhook config:', error)
      alert('Failed to generate webhook configuration. Please try again.')      
    }
    finally
    {
      setIsGenerating(false)

    }

   

  }

  const getUpstreamNodeIds=(nodeId:string):string[]=>{
    const ids=edges.filter((edge)=>edge.target===nodeId)
    .map((edge)=>edge.source)
    return [...new Set(ids)]
  }


  const buildAvailableVars=(forNodeId?:string):string[]=>{
    const vars:string[]=[] 
    if(workflowData.triggerType==='WEBHOOK')
    {
      vars.push('$json.body')
    }
    if(!forNodeId)return vars
    const currentIndex=nodes.findIndex(n=>n.id===forNodeId)
    const previousNodes=currentIndex===-1?nodes:nodes.slice(0,currentIndex)
    previousNodes.forEach((node)=>{
      const id=node.id
      if(node.data.type===Platform.GROQ_AI)
          {
              vars.push(`$node.${id}.response`)
              vars.push(`$node.${id}.model`)
              vars.push(`$node.${id}.totalTokenUsage`)
          }
          if(node.data.type===Platform.RESEND_EMAIL)
          {
            vars.push(`$node.${id}.status`)
            vars.push(`$node.${id}.messageId`)
          }
          if(node.data.type===Platform.WEBHOOK)
          {
            vars.push(`$json.body`)
          }
    })
    // if(forNodeId)
    // {
    //     const updstreamIds:string[]=getUpstreamNodeIds(forNodeId)
    //     updstreamIds.forEach((upstreamId)=>{
    //       const upstreamNode=nodes.find((node)=>node.id==upstreamId)
    //       if(!upstreamNode)return

    //       if(upstreamNode.data.type===Platform.GROQ_AI)
    //       {
    //           vars.push(`$node.${upstreamId}.response`)
    //           vars.push(`$node.${upstreamId}.model`)
    //           vars.push(`$node.${upstreamId}.totalTokenUsage`)
    //       }
    //       if(upstreamNode.data.type===Platform.RESEND_EMAIL)
    //       {
    //         vars.push(`$node.${upstreamId}.status`)
    //         vars.push(`$node.${upstreamId}.messageId`)
    //       }
    //       if(upstreamNode.data.type===Platform.WEBHOOK)
    //       {
    //         vars.push(`$json.body`)
    //       }
    //     })
    // } 
     return [...new Set(vars)]
  }


  const buildWokkflowPayload=()=>{
    const workflowNodes:Record<string,WorkflowNodePayload>={}
    const connections:Record<string,string[]>={}
    nodes.forEach((node)=>{
      if(node.data.type!=Platform.WEBHOOK)
      {
        workflowNodes[node.id]={
        id:node.id,
        label:node.data.label,
        type: node.data.type,
        credentialsId: node.data.credentialsId,
        position:{
          x: node.position.x,
          y:node.position.y
        },
        config: node.data.config
      }
      }
    })
    
    edges.forEach((edge)=>{
      if(!connections[edge.source])
      {
        connections[edge.source]=[]
      }
      connections[edge.source].push(edge.target)
    })

    return{
      title:workflowData.title,
      triggerType:workflowData.triggerType,
      nodes: workflowNodes,
      connections,
      webhook:workflowData.webhook
    }

  }

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds) as Node<WorkflowNodeData>[]),
    []
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    []
  )

  const handleSave=()=>{
    if (!user) return

    setIsSaving(true)
    setSaveStatus('idle')

    try {
      const payload = buildWokkflowPayload()
      console.log(JSON.stringify(payload),null,2)
      // await workflowApi.update(user.id, payload, workflowId)

      setSaveStatus('saved')

      setTimeout(() => setSaveStatus('idle'), 2000)

    } catch (error) {

      console.error('Failed to save workflow', error)

      setSaveStatus('error')

      setTimeout(() => setSaveStatus('idle'), 3000)

    } finally {

      setIsSaving(false)

    }
  }
   const saveLabel =
      isSaving
        ? 'Saving…'
        : saveStatus === 'saved'
        ? '✓ Saved'
        : saveStatus === 'error'
        ? '✗ Error'
        : 'Save Workflow'

  
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Add node button (top left) */}
      <Button
        onClick={() => {
          setShowSidebar(true)
          // addNode(`Node ${nodeCounter}`)
        }}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 10,
          left: 10,
        }}
      >
        Add node
      </Button>
      <Button
        style={{
          position: "absolute",
          top: 10,
          right: 20,
          zIndex: 10,
          background:
            saveStatus === 'saved'
              ? '#16a34a'
              : saveStatus === 'error'
              ? '#dc2626'
              : undefined
        }}
        onClick={handleSave}
        disabled={isSaving}
      >
        {saveLabel}
      </Button>

      {/* Center add-first-step button */}
      {nodes.length === 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <button
            onClick={() => setShowSidebar(true)}
            className="
              pointer-events-auto
              px-4 py-3
              text-base
              border border-dashed border-gray-500
              rounded-md
              bg-transparent
              text-gray-400
              cursor-pointer
              hover:border-orange-500
              transition-colors duration-200
              hover:text-orange-500
              ">
            + Add first step
          </button>
        </div>
      )}

      {showSidebar && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '240px',
            height: '100%',
            background: '#111',
            borderLeft: '1px solid #333',
            padding: '12px',
            zIndex: 20,
          }}
        >
          <h4 style={{ marginBottom: '12px' }}>Choose trigger</h4>
          <Button
            style={{ display: 'block', width: '100%' ,marginBottom:'8px'}}
            disabled={isGenerating}
            onClick={() => {
              generateWebhookConfig()
              // setShowWebhookModal(true)
              // setShowSidebar(false)
            }}
          >
            {isGenerating?'Generating...':'Trigger with webhook'}
            
          </Button>

          <Button style={{display:'block',width:'100%',marginBottom:'8px'}} onClick={()=>{
            const tempId = `n${nodeCounter}`
            setEditingNodeId(tempId)
            setShowResendEmailModal(true)
            setShowSidebar(false)
          }}>
              Resend Email
          </Button>
          <Button style={{display:'block',width:'100%',marginBottom:'8px'}} onClick={()=>{
            const tempId = `n${nodeCounter}`
            setEditingNodeId(tempId)
            setShowGroqAIModal(true)
            setShowSidebar(false)
          }}>
              Groq AI
          </Button>
          <Button style={{display:'block',width:'100%',marginBottom:'8px'}} onClick={()=>setShowSidebar(false)}></Button>
        </div>
      )}

      <WebhookModal isOpen={showWebhookModal} onClose={()=>{setShowWebhookModal(false)}} webhookData={webhookData} onSave={(config)=>{addNodeNew(Platform.WEBHOOK,'Webhook Trigger','Incoming webhook',config)}}></WebhookModal>
      <ResendEmailModal availableVars={buildAvailableVars(editingNodeId)}isOpen={showResendEmailModal} 
      onClose={()=>{
        setShowResendEmailModal(false)
        setEditingNodeId(undefined)
        }} 
      onSave={(config)=>{
          addNodeNew(
            Platform.RESEND_EMAIL,
            'Resend-Email',
            'Email sending',
            config)
          setShowResendEmailModal(false)
          setEditingNodeId(undefined)
        }}></ResendEmailModal>
      <GroqAIModal availableVars={buildAvailableVars(editingNodeId)}isOpen={showGroqAIModal} 
      onClose={()=>{
        setShowResendEmailModal(false)
        setEditingNodeId(undefined)
      }} 
      onSave={(config)=>{
         addNodeNew(
            Platform.GROQ_AI,
            'Groq-AI',
            'LLM Inference',
            config
          )
          setShowGroqAIModal(false)
          setEditingNodeId(undefined)
      }}></GroqAIModal>

      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

    

export default WorkflowCreateForm
