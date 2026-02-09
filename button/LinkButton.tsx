'use client'
import React, { ReactNode } from 'react'

const LinkButton = ({children,onClick}:{children:ReactNode,onClick:()=>void}) => {
  return (
    <div className='px-1 py-1 cursor-pointer hover:bg-slate-300 rounded-md'>
        {children}
    </div>
  )
}

export default LinkButton