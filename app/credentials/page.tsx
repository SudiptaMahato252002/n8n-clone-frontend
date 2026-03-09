'use client'
import GroqCredentialModal from '@/components/custom/GroqCredentialModal'
import ResendCredentialModal from '@/components/custom/ResendCredentialModal'
import SelectModal from '@/components/custom/SelectModal'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useCredentials } from '@/contexts/CredentialsContext'
import { credentialsApi } from '@/services/credentials.service'
import { CredentialsResponse } from '@/types'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { user } = useAuth()
  const {credentials, setCredentials} = useCredentials()
  const [selectModal, setSelectModal] = useState(false)
  const [groqCredntialModal,setGroqCredentialModal]=useState(false)
  const [resendCredentialModal,setResendCredentialModal]=useState(false)


  useEffect(() => {
  const fetchCredentials = async () => {
    if (!user?.id) return

    try {
      const data = await credentialsApi.getAll(user.id)
      setCredentials(data)

    } catch (error) {
      console.error('Failed to fetch credentials', error)
    }
  }

  fetchCredentials()
}, [user?.id])

const deleteCred=async(credId:string)=>{
    if (!user?.id) return

    try 
    {
      await credentialsApi.delete(credId,user?.id)
      setCredentials((prev)=>prev.filter((cred)=>cred.id!== credId))
    } 
    catch (error) 
    {
      console.error('Failed to delete credential', error)      
    }
    
}
  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'white',
        minHeight: '100vh',
      }}
    >
       <div style={{ marginBottom: '20px' }}>
            <Button
              onClick={() => setSelectModal(true)}
              style={{
                padding: '10px 14px',
                fontSize: '14px',
                borderRadius: '6px',
                border: '1px solid #555',
                // background: 'transparent',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              + Add Credential
            </Button>
        </div>
        <SelectModal isOpen={selectModal} onClose={()=>{setSelectModal(false)}}
            onSelectPlatform={(platform)=>{
                setSelectModal(false)
                if(platform==='Groq-AI')
                {
                  setGroqCredentialModal(true)
                }
                if(platform==='Resend-Email')
                {
                  setResendCredentialModal(true)
                }
            }}  
          ></SelectModal>
          <GroqCredentialModal isOpen={groqCredntialModal} onClose={()=>{setGroqCredentialModal(false)}} onCreated={(newCredential)=>{setCredentials((prev)=>[...prev,newCredential])}}></GroqCredentialModal>
          <ResendCredentialModal isOpen={resendCredentialModal} onClose={()=>{setResendCredentialModal(false)}} onCreated={(newCredential)=>{setCredentials((prev)=>[...prev,newCredential])}}></ResendCredentialModal>
      {credentials.length === 0 ? (
        <div
          style={{
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="40"
            height="40"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </g>
          </svg>

          <div>
            {user?.name}, Lets create your first credential
          </div>

          <button
            onClick={() => setSelectModal(true)}
            className="
              px-4 py-3
              text-base
              border border-dashed border-gray-500
              rounded-md
              bg-transparent
              text-gray-400
              cursor-pointer
              hover:border-orange-500
                hover:text-orange-500
              "
              >
            + Add first credential
          </button>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <h2>Your Credentials</h2>

          {credentials.map((cred) => (
  <div
    key={cred.id}
    style={{
      padding: '12px',
      border: '1px solid #333',
      borderRadius: '6px',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <div>
      <div><strong>{cred.title}</strong></div>
      <div style={{ fontSize: '12px', color: '#aaa' }}>
        Platform: {cred.id}
      </div>
      <div style={{ fontSize: '12px', color: '#aaa' }}>
        Platform: {cred.platform}
      </div>
    </div>

    <Button
      onClick={() =>{deleteCred(cred.id)}}>
      Delete
    </Button>
  </div>
))}

        </div>
      )}
    </div>
  )
}

export default Page
