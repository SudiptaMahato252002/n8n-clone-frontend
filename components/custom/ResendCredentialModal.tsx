import React, { useState } from 'react'
import Modal from './Modal'
import FormField from './FormField'
import {Button} from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CreateCredentilasRequest, CredentialsResponse } from '@/types'
import { credentialsApi } from '@/services/credentials.service'
import { useAuth } from '@/contexts/AuthContext'

type ResendCredentialProps = {
  isOpen: boolean
  onClose: () => void
  onCreated:(credential:CredentialsResponse)=>void
  
}




const ResendCredentialModal = ({isOpen,onClose,onCreated}:ResendCredentialProps) => {

    const {user}=useAuth()
    const [apiKey,setApiKey]=useState('')
    const isDisabled=apiKey.trim()===''

    const handleOnSave = async () => {
        if (!user?.id) {
            console.error("User not authenticated")
            return
        }
        const payload: CreateCredentilasRequest = {
                title: 'RESEND_CREDENTIALS',
                platform: 'RESEND_EMAIL',
                credentials: {
                apiKey: apiKey,
                fromEmail: 'onboarding@resend.dev'
            }
        }
        // console.log(user.id)
        // console.log(JSON.stringify(payload))
        // alert(payload)
    
        const createdCredential=await credentialsApi.create(user?.id,payload)
        onCreated(createdCredential)
        onClose()   
    }


const handleClose=()=>{
    onClose()
}

if (!isOpen) return null
  return(
    <Modal>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
            Set Resend Credtnials
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

        <FormField label='Resend Api Key' value={apiKey} editable onChange={(value)=>{setApiKey(value)}}>
           <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Get your API key from{' '}
                <a href="https://resend.com/api-keys" target="_blank" style={{ color: '#4ade80' }}>
                  resend.com
                </a>
              </p> 
        </FormField >
        <FormField label='From Email' value='onboarding@resend.dev' >
           
        </FormField>
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

export default ResendCredentialModal