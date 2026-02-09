'use client'
import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import Input from '@/components/custom/Input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const page = () => {

  const {signup,error,clearError,isLoading}=useAuth()

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [validationError,setValidationError]=useState('')

  const router=useRouter()

  const isFormValid = name.trim() !== '' && 
                       email.trim() !== '' && 
                       password.trim() !== '' && 
                       confirmPassword.trim() !== ''


  const handleSubmit=async(e:FormEvent)=>{

    e.preventDefault()
    setValidationError('')
    clearError()

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match')
      return
    }


    try 
    {
      await signup({name,email,password})
      router.push('/dashboard')
      
    } 
    catch (err:any) 
    {
        console.error('Signup failed:', err)
    }

  }

  const displayError=validationError||error

  return (
    <main className='max-w-7xl mx-auto p-4 pt-16'>
      <div className='flex items-center gap-16'>
        <aside className='flex flex-1 items-center flex-col'>
          <h1 className='text-5xl font-bold text-center pt-4 max-w-md'>
              AI Automation starts and scales with Nodeflow
          </h1>
          <div className='text-lg text-center max-w-xl pt-4'>
            <p>Orchestrate AI across your teams, tools, and processes. Turn ideas into automated action today, and power tomorrow’s business growth.</p>
          </div>

          
          <ul className='mt-6 space-y-4'>
            <div>
              <li className='flex items-center gap-3'>
                <Image alt='check-sign' src='/asset/icons/check-circle.webp' height={32} width={32} className='shrink-0'></Image>
                <span className='text-base leading-tight'>Integrate apps and AI tools wihtout code</span>
              </li>
            </div>
            
            <div>
              <li className='flex items-center gap-3'>
                <Image alt='check-sign' src='/asset/icons/check-circle.webp' height={32} width={32} className='shrink-0'></Image>
                <span className='text-base leading-tight'>Build AI powered workflows within minutes.Not weeks</span>
              </li>
            </div>

            <div>
              <li className='flex items-center gap-3'>
                <Image alt='check-sign' src='/asset/icons/check-circle.webp' height={32} width={32} className='shrink-0'></Image>
                <span className='text-base leading-tight'>14 day trial of all premium features and apps</span>
              </li>
            </div>
          </ul>

          <div className="mt-6 flex items-center gap-8 opacity-70">
            <span>okta</span>
            <span>hp</span>
            <span>samsung</span>
            <span>lowes</span>
            <span>pepsico</span>
            <span>p&g</span>
          </div>
        </aside>
        <aside className='flex flex-1 items-center relative'>
            <form action="" onSubmit={handleSubmit} className='flex flex-col justify-center border rounded-lg p-6 w-full max-w-sm bg-white shadow-sm' >
              <h2 className="text-xl font-bold mb-2">
                Create your account
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Start automating workflows in minutes.
              </p>

              {displayError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-red-600">{displayError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setValidationError('')
                      clearError()
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
              <Input label='Name' value={name} onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Your Name' required></Input>
              <Input label='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} type='text' placeholder='Your Email' required></Input>
              <Input label='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='*******' required></Input>
              <Input label='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='••••••••' required disabled={isLoading}/>
              
              <Button type='submit'  
                className={cn(
                'mt-4 py-2 font-medium rounded-md transition',
                !isFormValid || isLoading
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              )}>
                  {isLoading?(
                    <span className="flex items-center justify-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
                ):('Get started free')}      
              </Button>

              <div className="text-center text-sm text-gray-600">
                <p>Already have an account?</p>
                <Link href={'/login'} className="text-blue-500 font-medium hover:underline">Login</Link>
              </div>
            
            </form>
            
            
        </aside>
      </div>
    </main>
  )
}

export default page


