import Hero from '@/components/custom/Hero'
import Navbar from '@/components/custom/Navbar'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Navbar></Navbar>
        <Hero></Hero>
        {children}
    </div>
    
  )
}

export default layout