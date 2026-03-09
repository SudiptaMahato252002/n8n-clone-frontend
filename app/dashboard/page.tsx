'use client'
import { useAuth } from '@/contexts/AuthContext'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import WorkflowInfoModal from '@/components/custom/WorkflowInfoModal'
import { CreateWorkflowRequest, workflowApi } from '@/services/workflow.service'




const page = () => {
  const [showInfoModal,setShowInfoModal]=useState(false)
  const {user}=useAuth();
  const router=useRouter();

  const handleSave=async(config:{title:string})=>{

    try 
    {
      const data:CreateWorkflowRequest={
        title: config.title,
        triggerType: 'MANUAL',
        nodes:{},
        connections:{},
      }
      if(!user)
      {
        return
      }
      const res=await workflowApi.create(user?.id,data)
      setShowInfoModal(false)
      router.push(`/workflow/create/${res.id}`)
          
    } 
    catch (error) 
    {
      console.error("Failed to create workflow", error)
    }

  

}

  return (
    <div>

      <div>
        <h1>Hello {user?.name}</h1>
        <p className='text-gray-600 mb-8'>Welcome to your dashboard</p>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
          <div className='flex gap 5'>
            <Button onClick={()=>{
              setShowInfoModal(true)
              }}>Create Workflow</Button>
            <Button onClick={() => router.push('/credentials')}>Manage Credentials</Button>
          </div>
        </div>

      </div>
      <WorkflowInfoModal isOpen={showInfoModal} onClose={()=>{setShowInfoModal(false)}} onSave={(config)=>{handleSave(config)}}/>
      <div className='mt-8 bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold mb-4'>Your Information</h2>
          <div className='space-y-2'>
            <p><span className='font-medium'>Email:</span> {user?.email}</p>
            <p><span className='font-medium'>User ID:</span> {user?.id}</p>
            <p><span className='font-medium'>Roles:</span> {user?.roles?.join(', ')}</p>
          </div>
        </div>
    </div>
  )
}

export default page