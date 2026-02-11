import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export type FormFieldProps={
    label: string,
    value: string,
    onChange?:(vaue:string)=>void
    editable?:boolean
    multiline?:boolean
    rows?:number
    showCopy?:boolean
    color?:string
}



const FormField = ({label,value,onChange,editable=false,multiline=false,rows=4,showCopy=false,color='#fff'}:FormFieldProps) => {
    const [copied,setCopied]=useState(false)
    const copyToClipBoard=()=>{
        navigator.clipboard.writeText(value)
        setCopied(true)

        setTimeout(()=>{
            setCopied(false)
        },300)
    }
  return (
    <div style={{ marginBottom: '16px' }}>
          <h3 style={{ color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>{label}</h3>
          {editable?(multiline?(
            <textarea 
                name="" 
                id="" value={value} 
                onChange={(e)=>onChange?.(e.target.value)}
                style={{
                    width: '100%',
                    background: '#0a0a0a',
                    padding: '12px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    color,
                    border: '1px solid #333',
                    resize: 'vertical',
                }}    
            
            />

          ):(
            <input type="text" 
                value={value}
                onChange={(e)=>onChange?.(e.target.value)}
                style={{
                    width: '100%',
                    background: '#0a0a0a',
                    padding: '12px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    color,
                    border: '1px solid #333',
                }}

            />
          )):(
            <div style={{ 
                background: '#0a0a0a', 
                padding: '12px', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#4ade80',
                wordBreak: 'break-all',
                marginBottom: '8px',
            }}>{value}</div>
          )}
          
          
          
          {showCopy&& !editable &&(
            <Button  style={{ fontSize: '12px', padding: '4px 12px' }} onClick={copyToClipBoard}>
                {copied?'Copied':'Copy'}
          </Button>
          )}
        </div>

  )
}

export default FormField