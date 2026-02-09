'use client'
import React from 'react'
import Image from 'next/image'
import Input from '@/components/custom/Input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const page = () => {
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
            <form action="" className='flex flex-col justify-center border rounded-lg p-6 w-full max-w-sm bg-white shadow-sm' >
              <h2 className="text-xl font-semibold">
                Create your account
              </h2>

              <p className="text-sm text-gray-600 m-2">
                Start automating workflows in minutes.
              </p>
              <Input label='Name' onChange={()=>{}} type='text' placeholder='Your Name'></Input>
              <Input label='Email' onChange={()=>{}} type='text' placeholder='Your Email'></Input>
              <Input label='Password' onChange={()=>{}} type='password' placeholder='Password'></Input>

              <Button type='submit'  className="mt-2 text-white rounded-md py-2 font-medium hover:opacity-90 transition">Get started free</Button>

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


