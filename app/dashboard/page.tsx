'use client'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const page = () => {
  const {user}=useAuth();
  const router=useRouter();
  return (
    <div>

      <div>
        <h1>Hello {user?.name}</h1>
        <p className='text-gray-600 mb-8'>Welcome to your dashboard</p>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
          <div>
            <Button onClick={()=>{router.push('/workflow/create')}}>Create Workflow</Button>
            <Button onClick={() => router.push('/credentials')}>Manage Credentials</Button>
          </div>
        </div>

      </div>
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