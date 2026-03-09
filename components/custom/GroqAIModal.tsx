import React, { useEffect, useState } from 'react'
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
//   initialConfig?: GroqAIConfig
}

export type GroqAIConfig = {
  credentialsId?: string
  prompt: string
  model?: string
  temperature: string
  maxTokens: string
}

const GroqAIModal = ({ isOpen, onClose,onSave}: GroqAIModalProps) => {
    const [prompt,setPrompt]=useState('')
    const [temperature,setTemperature]=useState('0.7')
    const [maxTokens,setMaxTokens]=useState('1024')
    const [model,setModel]=useState('llama-3.3-70b-versatile')
    const [selectCredentialsId,setSelectCredntialsId]=useState('')
    const {credentials}=useCredentials()

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
        <FormField 
                label='Prompt' 
                value={prompt} 
                onChange={(value)=>setPrompt(value)} 
                editable 
                multiline 
                rows={6} 
                color="#a78bfa"/>
        
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
                onChange={(e)=>{setTemperature}} 
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