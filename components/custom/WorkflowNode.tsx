'use client'
import { Handle, NodeProps, Position,Node } from '@xyflow/react'
import React, { useState } from 'react'

type WorkflowNodeData = Node<{
  label: string
  subtitle?: string
  onDelete:(id:string)=>void
}>

const WorkflowNode = ({id,data}:NodeProps<WorkflowNodeData>) => {
    const [hover,setHover]=useState(false)


  return (
    <div 
        onMouseEnter={()=>{setHover(true)}}
        onMouseLeave={()=>{setHover(false)}}
        style={{
                minWidth: 200,
                background: '#1a1a1a',
                border: '1px solid #2f2f2f',
                borderRadius: '10px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
                color: '#fff',
                overflow: 'hidden',}}>
        
        {hover&&(<button
            onClick={(e)=>{
                e.stopPropagation()
                data.onDelete(id)
            }}
            
            style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: 'none',
            background: '#2a2a2a',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '12px',
          }}>
            ✕
        </button>)}

        
        <Handle type='target' position={Position.Top}
            style={{
            background: '#666',
            width: 10,
            height: 10,
            }}/>
        <div style={{
            padding: '10px 12px',
            borderBottom: '1px solid #2a2a2a',
            background: '#202020',
            fontWeight: 600,
            fontSize: '14px',}}>
            {data?.label}
        </div>
        {data.subtitle && (
            <div
            style={{
            padding: '10px 12px',
            fontSize: '12px',
            color: '#aaa',
            }}>
          {data.subtitle}
        </div>)}

        <Handle type='source' position={Position.Bottom} style={{
          background: '#666',
          width: 10,
          height: 10,
        }}/>
    </div>
  )
}

export default WorkflowNode