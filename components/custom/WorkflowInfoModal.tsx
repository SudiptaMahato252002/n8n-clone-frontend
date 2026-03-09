import React, { useState } from 'react'
import Modal from './Modal'
import FormField from './FormField'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
type Info={
    title:string
}
type WorkkflowInfoProps={
    isOpen:boolean,
    onClose:()=>void,
    onSave:(config:Info)=>void,
}

const WorkflowInfoModal = ({isOpen,onSave,onClose}:WorkkflowInfoProps) => {
    const [title,setTitle]=useState('')
    const isDisabled=title.trim()===''

    const handleOnSave=()=>{
        const config:Info={
            title:title
        }
        onSave(config)
        setTitle('')
        onClose()
    }
    const handleClose=()=>{
        setTitle('')
        onClose()
    }
    if (!isOpen) return null
  return (
    <Modal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
            Configure AI Node
          </h2>
          <button 
            onClick={()=>{handleClose()}}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#999',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
        <FormField label='Workflow Name' value={title} onChange={(value)=>setTitle(value)} editable color="#a78bfa"/>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap:'10px' }}>
            <Button onClick={()=>{handleOnSave()}} disabled={isDisabled}  className={cn('mt-2 py-2 font-medium rounded-md transition',
                                isDisabled?'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300'
                                :'bg-orange-500 text-white hover:bg-orange-600'
                              )}>Save</Button>
        </div>
    </Modal>
  )
}

export default WorkflowInfoModal