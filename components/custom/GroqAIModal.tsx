import React, { useEffect, useRef, useState } from 'react'
import FormField from './FormField'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { credentialsApi } from '@/services/credentials.service'
import { CredentialsResponse } from '@/types'
import Modal from './Modal'
import SelectModal from './SelectModal'
import { useCredentials } from '@/contexts/CredentialsContext'

type GroqAIModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (config: GroqAIConfig) => void
  availableVars:string[]
//   initialConfig?: GroqAIConfig
}

export type GroqAIConfig = {
  credentialsId?: string
  prompt: string
  model?: string
  temperature: string
  maxTokens: string
}

const GroqAIModal = ({ isOpen, onClose,onSave,availableVars}: GroqAIModalProps) => {
    const [prompt,setPrompt]=useState('')
    const [temperature,setTemperature]=useState('0.7')
    const [maxTokens,setMaxTokens]=useState('1024')
    const [model,setModel]=useState('llama-3.3-70b-versatile')
    const [selectCredentialsId,setSelectCredntialsId]=useState('')
    const {credentials}=useCredentials()
    const promptRef=useRef<HTMLTextAreaElement>(null)


    const groqCredentials=credentials.filter((cred)=>cred.platform=='GROQ_AI')
    const handleSave=()=>{
        if(!prompt)
        {
            alert('Please enter a prompt')
            return
        }
        const config:GroqAIConfig={
            credentialsId:selectCredentialsId,
            prompt:prompt,
            temperature:temperature,
            maxTokens:maxTokens,
            model:model
        }
        onSave(config)
        handleClose()
    }

    const handleClose=()=>{
        setPrompt('')
        setMaxTokens('1024')
        setTemperature('0.7')
        setSelectCredntialsId('')
        onClose()
    }

    const insertVariable=(varPath: string)=>{
      const tag=`{{${varPath}}`
      const el=promptRef.current
      if(!el)
      {
        setPrompt(prev=> prev+tag)
        return
      }

      const start=el.selectionStart??prompt.length
      const end=el.selectionEnd??prompt.length

      setPrompt(prev=>prev.slice(0, start)+tag+prev.slice(end))

      setTimeout(()=>{
        el.focus()
        el.setSelectionRange(
          start+tag.length,
          start+tag.length
        )
      },0)
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
        <select name="" id=""
          onChange={(e)=>{setSelectCredntialsId(e.target.value)}}
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
              {groqCredentials.map((cred)=>(
                <option value={cred.id} key={cred.id}>{cred.title}</option>
              ))}
        </select>
        {/* <FormField 
                label='Prompt' 
                value={prompt} 
                onChange={(value)=>setPrompt(value)} 
                editable 
                multiline 
                rows={6} 
                color="#a78bfa"/> */}
        {availableVars.length > 0 && (
    <div style={{ marginBottom: '8px' }}>
      <span
        style={{
          fontSize: '11px',
          color: '#666',
          marginRight: '6px'
        }}
      >
        Insert variable:
      </span>

      {availableVars.map((v) => (
        <button
          key={v}
          onClick={() => insertVariable(v)}
          style={{
            display: 'inline-block',
            margin: '2px 3px',
            padding: '2px 8px',
            fontSize: '11px',
            background: '#0d1f0d',
            border: '1px solid #2d6a2d',
            borderRadius: '4px',
            color: '#4ade80',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}
        >
          {`{{${v}}}`}
        </button>
      ))}
    </div>
  )}
        <div style={{marginBottom:'16px'}}>
          <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  color: '#aaa'
          }}>Prompt</label>
          <textarea 
            ref={promptRef} 
            value={prompt} 
            onChange={(e)=>setPrompt(e.target.value)}
            rows={6}
            style={{
                width: '100%',
                background: '#0a0a0a',
                padding: '12px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#a78bfa',
                border: '1px solid #333',
                resize: 'vertical'
            }}
            ></textarea>

        </div>
        
        <div style={{ marginBottom: '16px' }}>
            <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                color: '#aaa' 
            }}>
                Model
            </label>
            <select value={model} name="" id="" onChange={(e)=>{setModel(e.target.value)}} style={{
                width: '100%',
                padding: '10px',
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '14px'
            }}>
                <option value="LLaMA 3.3 70b-versatile">LLaMA 3.3 70B (Recommended)</option>
                <option value="LLaMA 3.1 8b-instant">LLaMA 3.1 8B (Fastest)</option>
                <option value="Mixtral 8x7B-32767"> Mixtral 8x7B (Large Context)</option>
                <option value="Gemma2 9B">Gemma2 9B</option>
            </select>
        </div>

        
        <FormField
                label='Temperature(0.0-1.0)' 
                value={temperature} 
                onChange={(value)=>{setTemperature(value)}} 
                editable 
                color="#a78bfa"
        />
        <FormField 
                label="Max Tokens" 
                value={maxTokens} 
                editable 
                onChange={setMaxTokens}
                color="#a78bfa"
        />
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap:'10px' }}>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={handleSave}>Save</Button>
        </div>
    </Modal>
  )
}

export default GroqAIModal