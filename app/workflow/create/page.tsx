'use client'
import { Button } from '@/components/ui/button'
import React, { useCallback, useState } from 'react'
import { NodeToolbar,ReactFlow, Background, Controls,Node ,Edge, NodeChange, applyNodeChanges, OnNodesChange, EdgeChange, applyEdgeChanges,OnEdgesChange, Connection, addEdge, NodeTypes} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkflowNode from '@/components/custom/WorkflowNode';


const nodeTypes:NodeTypes={
  workflow:WorkflowNode
}

const WorkflowCreateForm = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [nodeCounter, setNodeCounter] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
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

  const onDelete=useCallback((id:string)=>{
    setNodes((nds)=>nds.filter((n)=>n.id!==id))
    setEdges((eds)=>eds.filter((e)=>e.source!==id && e.target!==id))
  },[])

  const addNode = (label: string,subtitle?:string) => {
    const id = `n${nodeCounter}`

    const newNode: Node = {
      id,
      position: { x: 250, y: 200 },
      data: { label,subtitle,onDelete },
      type: 'workflow',
    }

    setNodes((prev) => [...prev, newNode])
    setNodeCounter((prev) => prev + 1)
  }

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Add node button (top left) */}
      <Button
        onClick={() => addNode(`Node ${nodeCounter}`)}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 10,
          left: 10,
        }}
      >
        Add node
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
            style={{
              pointerEvents: 'auto',
              padding: '12px 16px',
              fontSize: '16px',
              border: '1px dashed #666',
              borderRadius: '6px',
              background: 'transparent',
              color: '#aaa',
              cursor: 'pointer',
            }}
          >
            + Add first step
          </button>
        </div>
      )}

      {/* Sidebar */}
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
            style={{ display: 'block', width: '100%', marginBottom: '8px' }}
            onClick={() => {
              addNode('Manual Trigger')
              setShowSidebar(false)
            }}
          >
            Trigger manually
          </Button>

          <Button
            style={{ display: 'block', width: '100%' }}
            onClick={() => {
              addNode('Webhook Trigger')
              setShowSidebar(false)
            }}
          >
            Trigger with webhook
          </Button>
        </div>
      )}

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


    // <form>
    //   <input type="text" placeholder="Workflow Name"/>

    //   <input type="text" placeholder="Webhook Secret"/>

    //   <select>
    //     <option value="">Select Credentials</option>
    //   </select>

    //   <input type="email" placeholder="To Email"/>

    //   <input type="text"placeholder="Email Subject"/>

    //   <textarea placeholder="Email Body" rows={5}/>

    //   <Button type="submit">Create Workflow</Button>
    // </form>

export default WorkflowCreateForm
