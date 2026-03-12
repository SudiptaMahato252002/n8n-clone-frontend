import React, { useState ,useRef, RefObject} from 'react'
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
    availableVars:string[]
}
type FocusedField='to'|'body'|'subject'|null
const ResendEmailModal = ({isOpen,onClose,onSave,availableVars}:ResendEmailProps) => {
    // const [fromEmail,setFromEmail]=useState('')
    const {credentials}=useCredentials()
    const [toEmail,setToEmail]=useState('')
    const [emailBody,setEmailBody]=useState('');
    const [subject,setSubject]=useState('');
    const [credentialId,setCredentialId]=useState('')
    const [focusedField, setFocusedField] = useState<FocusedField>(null)

    const toRef = useRef<HTMLInputElement>(null)
    const subjectRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    const resendCredentials=credentials.filter((cred)=>{
        return cred.platform==='RESEND_EMAIL'
    })

    const isDisabled=toEmail.trim()===''||emailBody.trim()===''

    const handleClose=()=>{
        setToEmail('')
        setEmailBody('')
        setCredentialId('')
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
        setCredentialId('')
        onClose()

    }

    const insertVariable = (varPath: string) => {
  const tag = `{{${varPath}}}`

  const insertInto = (
    value: string,
    setter: (v: string) => void,
    ref: RefObject<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const el = ref.current

    if (!el) {
      setter(value + tag)
      return
    }

    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? value.length

    setter(value.slice(0, start) + tag + value.slice(end))

    setTimeout(() => {
      el.focus()
      el.setSelectionRange(start + tag.length, start + tag.length)
    }, 0)
  }

  if (focusedField === 'to') {
    insertInto(toEmail, setToEmail, toRef as any)
  } else if (focusedField === 'subject') {
    insertInto(subject, setSubject, subjectRef as any)
  } else if (focusedField === 'body') {
    insertInto(emailBody, setEmailBody, bodyRef as any)
  } else {
    setEmailBody(prev => prev + tag)
  }
}   
    if(!isOpen)return null

     const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0a0a0a',
    padding: '10px 12px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#fff',
    border: '1px solid #333',
    outline: 'none',
  }

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
              onChange={(e)=>setCredentialId(e.target.value)}
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
        console.log("Available Vars:", availableVars)
        {availableVars.length > 0 && (
        <div style={{ marginBottom: '16px', padding: '10px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '4px' }}>
          <span style={{ fontSize: '11px', color: '#666', display: 'block', marginBottom: '6px' }}>
            Click a variable to insert it into the focused field:
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
                fontFamily: 'monospace',
              }}
            >
              {`{{${v}}}`}
            </button>
          ))}
        </div>
      )}

      {/* To */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#aaa' }}>To Email</label>
        <input
          ref={toRef}
          type="text"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          onFocus={() => setFocusedField('to')}
          style={inputStyle}
        />
      </div>

      {/* Subject */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#aaa' }}>Subject</label>
        <input
          ref={subjectRef}
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          onFocus={() => setFocusedField('subject')}
          style={inputStyle}
        />
      </div>

      {/* Body */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#aaa' }}>Email Body</label>
        <textarea
          ref={bodyRef}
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          onFocus={() => setFocusedField('body')}
          rows={8}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

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