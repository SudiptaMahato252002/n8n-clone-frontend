import React, { useState } from 'react'
import Modal from './Modal'
import {Button} from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ModalProps={
    isOpen: boolean,
    onClose:()=>void,
    onSelectPlatform:(platform:string)=>void
}


const SelectModal = ({isOpen,onClose,onSelectPlatform}:ModalProps) => {
    const [platform,setPlatform]=useState('')
    const isDisabled=platform.trim()===''
    if (!isOpen) return null
    const handleClose=()=>{
        setPlatform('')
        onClose()
    }
  return (
    <Modal>
        <div style={{ marginBottom: '20px' }}>
            <div
                style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                }}>
                <h2
                style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#fff',
                    margin: 0,
                }}>
                    Add Credential
                </h2>

                <button
                onClick={handleClose}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#999',
                    fontSize: '24px',
                    cursor: 'pointer',
                    width: '30px',
                    height: '30px',
                }}>✕</button>
            </div>
            <p
                style={{
                color: '#aaa',
                fontSize: '14px',
                marginTop: '8px',
                }}
            >
                Select an App or Service to connect to
            </p>
            <select  name="" id="" onChange={(e)=>{setPlatform(e.target.value)}} style={{
                width: '100%',
                padding: '10px',
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '14px'
            }}>
                 <option value="">Select Platform</option>
                <option value="Resend-Email">Resend-Email</option>
                <option value="Groq-AI">Groq-AI</option>
                <option value="Telegram"> Telegram</option>
                <option value="Gemini">Gemini</option>
            </select>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap:'10px' }}>
                <Button onClick={()=>{onSelectPlatform(platform)
                    setPlatform('')
                }} disabled={isDisabled}  className={cn('mt-2 py-2 font-medium rounded-md transition',
                                isDisabled?'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300'
                                :'bg-orange-500 text-white hover:bg-orange-600'
                              )}>Save</Button>
            </div>
        </div>
    </Modal>
  )
}

export default SelectModal