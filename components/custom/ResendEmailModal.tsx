import React, { useState } from 'react'
import FormField from './FormField'
import { Button } from '@/components/ui/button'

type ResendEmailProps={
    isOpen:boolean,
    onClose:()=>void,
}

const ResendEmailModal = ({isOpen,onClose}:ResendEmailProps) => {
    const [fromEmail,setFromEmail]=useState('')
    const [toEmail,setToEmail]=useState('')
    const [emailBody,setEmailBody]=useState('');

    if(!isOpen)return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>

            <div style={{
            background: '#1a1a1a',
            borderRadius: '8px',
            padding: '24px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            border: '1px solid #333',
            }}>

                <FormField label='From Email' value={fromEmail} editable onChange={setFromEmail}></FormField>
                <FormField label='To Email' value={toEmail} editable onChange={setToEmail}></FormField>
                <FormField label='Email Body' value={emailBody} editable onChange={setEmailBody} rows={8}></FormField>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={()=>{
                        onClose()
                        setEmailBody('')
                        setFromEmail('')
                        setToEmail('')
                    }}>Close</Button>
                </div>
            
            </div>

        </div>
    )
}

export default ResendEmailModal