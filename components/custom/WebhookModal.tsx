
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import FormField from './FormField'

export type WebhookDataProps={
    id: string,
        secret: string,
        title: string,
        method: 'PUT'|'GET'|'POST'|'PATCH'|'DELETE'
        url: string
}

type WebhookModalProps={
    isOpen: boolean,
    onClose:()=>void,
    webhookData:WebhookDataProps|null

}

const WebhookModal = ({isOpen,onClose,webhookData}:WebhookModalProps) => {
    const [copiedField,setCopiedField]=useState<'url'|'secret'|null>(null)

    const copyToClipboard=(text:string,field:'url'|'secret'|null)=>{
        navigator.clipboard.writeText(text)
        setCopiedField(field)

        setTimeout(() => {
            setCopiedField(null)
        }, 300)
    }
  if (!isOpen || !webhookData) return null

  
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Webhook Cretad</h2>
                <button style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#999',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '0',
                    width: '30px',
                    height: '30px',
                    }}
                    onClick={onClose}>✕</button>
            </div>
            
        {/* </div> */}

        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Webhook URL</h3>
          <div style={{ 
            background: '#0a0a0a', 
            padding: '12px', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#4ade80',
            wordBreak: 'break-all',
            marginBottom: '8px',
          }}>{webhookData?.url}</div>
          <Button  style={{ fontSize: '12px', padding: '4px 12px' }} onClick={()=>{copyToClipboard(webhookData.url,'url')}}>
            {copiedField==='url'?'Copied':'Copy URL'}
          </Button>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>HTTP Method</h3>
          <div style={{ 
            background: '#0a0a0a', 
            padding: '12px', 
            borderRadius: '4px',
            fontSize: '14px',
            color: '#60a5fa',
          }}>{webhookData?.method}</div>
        </div>

        {webhookData?.secret && (
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Secret (Authorization Header)</h3>
            <div style={{ 
              background: '#0a0a0a', 
              padding: '12px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#f59e0b',
              wordBreak: 'break-all',
              marginBottom: '8px',
            }}>{webhookData?.secret}</div>
            <Button style={{ fontSize: '12px', padding: '4px 12px' }} onClick={()=>{copyToClipboard(webhookData?.secret,'secret')}}>
              {copiedField==='secret'?'Copied':'Copy Secret'}
            </Button>
          </div>
        )}
        
        <div style={{ 
          marginTop: '24px',
          padding: '12px',
          background: '#0a0a0a',
          borderRadius: '4px',
          borderLeft: '3px solid #3b82f6',
        }}>
          <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px' }}>
            <strong>How to use this webhook:</strong>
          </p>
          <p style={{ fontSize: '12px', color: '#999' }}>
            Send a {webhookData?.method} request to the URL above.
            {webhookData?.secret && ' Include the secret in the Authorization header.'}
          </p>
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Close</Button>
        </div>

    </div>
    </div>
  )
}

export default WebhookModal