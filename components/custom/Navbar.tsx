'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import LinkButton from '@/button/LinkButton'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router=useRouter()
  return (
    <div className=" px-4 h-14 border-b">
      <nav className='flex items-center justify-between h-full '>
        <Link href="/" className='flex items-center gap-2'>
          <Image src="/asset/icons/logo.png" alt='Logo' height={32} width={32}></Image>
          <h1 className='text-xl font-bold'>Nodeflow</h1>
        </Link>

      <div className='flex items-center gap-1'>
        <LinkButton onClick={()=>{}}>Contact sales</LinkButton>
        <LinkButton onClick={()=>{
          router.push('/login')
        }}>Login</LinkButton>
        <Button onClick={()=>{}} >Logout</Button>
      </div>

      </nav>

    </div>
  )
}

export default Navbar