'use client'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'


const page = () => {

const {user}=useAuth()
  return (
    <div>
        <h1>
            Hello {user?.name}
        </h1>
    </div>

  )
  
}

export default page