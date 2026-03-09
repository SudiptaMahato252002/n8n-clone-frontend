import React, { useState } from 'react'
import Modal from './Modal'
import FormField from './FormField'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { CreateCredentilasRequest, CredentialsResponse } from '@/types'
import { credentialsApi } from '@/services/credentials.service'

type GroqCredentialProps = {
  isOpen: boolean
  onClose: () => void
  onCreated:(credetial:CredentialsResponse)=>void
  
}

const GroqCredentialModal = ({isOpen,onClose,onCreated}:GroqCredentialProps) => {
  const {user}=useAuth()
  const [apiKey,setApiKey]=useState('')
  const isDisabled=apiKey.trim()===''

const handleOnSave=async()=>{
    if (!user?.id) 
    {
        console.error("User not authenticated")
        return
    }
    const payload:CreateCredentilasRequest={
        title: 'GROQ_CREDENTIALS',
        platform: 'GROQ_AI',
        credentials: {
                apiKey: apiKey,
            }
    }
    const createdCredential=await credentialsApi.create(user?.id,payload)
    onCreated(createdCredential)
    onClose()
}

const handleClose=()=>{
    setApiKey('')
    onClose()
}

if (!isOpen) return null
  return(
    <Modal>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
            Set Groq Credentials
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
        <FormField label='Groq Api Key' value={apiKey} editable onChange={(value)=>{setApiKey(value)}}>
           <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Get your API key from{' '}
                <a href="https://console.groq.com/keys" target="_blank" style={{ color: '#4ade80' }}>
                  console.groq.com
                </a>
              </p> 
        </FormField >
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap:'10px' }}>
                <Button onClick={()=>{
                    handleOnSave()
                }} disabled={isDisabled}  className={cn('mt-2 py-2 font-medium rounded-md transition',
                                isDisabled?'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300'
                                :'bg-orange-500 text-white hover:bg-orange-600'
                              )}>Save</Button>
        </div>

  </Modal>
  )
}

export default GroqCredentialModal