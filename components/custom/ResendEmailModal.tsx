import React, { useState } from 'react'
import FormField from './FormField'
import { Button } from '@/components/ui/button'
import Modal from './Modal'
import { cn } from '@/lib/utils'
import { useCredentials } from '@/contexts/CredentialsContext'

type ResendEmailConfig={
    credentialsId:string,
    to:string,
    body:string,
    subject:string

}


type ResendEmailProps={
    isOpen:boolean,
    onClose:()=>void,
    onSave:(config:ResendEmailConfig)=>void
}

const ResendEmailModal = ({isOpen,onClose,onSave}:ResendEmailProps) => {
    // const [fromEmail,setFromEmail]=useState('')
    const {credentials}=useCredentials()
    const [toEmail,setToEmail]=useState('')
    const [emailBody,setEmailBody]=useState('');
    const [subject,setSubject]=useState('');
    const [credentialId,setCredentialId]=useState('')

    const resendCredentials=credentials.filter((cred)=>{
        cred.platform=='RESEND_EMAIL'
    })

    const isDisabled=toEmail.trim()===''||emailBody.trim()===''

    const handleClose=()=>{
        setToEmail('')
        setEmailBody('')
        onClose()
    }

    const handleOnSave=()=>{
        const config:ResendEmailConfig={
            credentialsId:credentialId,
            to:toEmail,
            body:emailBody,
            subject:subject

        }

        onSave(config)
        setToEmail('')
        setEmailBody('')
        onClose()

    }
    if(!isOpen)return null

    return (
        <Modal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
                    Set Email Configurations
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
            <select name="" id=""
          onChange={(e)=>{setCredentialId(e.target.value)}}
          style={{
                width: '100%',
                padding: '10px',
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '14px'
            }}>
              <option value="">Select Platform</option>
              {resendCredentials.map((cred)=>(
                <option value={cred.id} key={cred.id}>{cred.title}</option>
              ))}
        </select>

                {/* <FormField label='From Email' value={fromEmail} editable onChange={setFromEmail}></FormField> */}
                <FormField label='To Email' value={toEmail} editable onChange={setToEmail}></FormField>
                <FormField label='Email Body' value={emailBody} editable onChange={setEmailBody} rows={8}></FormField>
                <FormField label='Subject' value={subject} editable onChange={setSubject}></FormField>
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

export default ResendEmailModal