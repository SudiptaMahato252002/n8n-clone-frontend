import { Button } from '@/components/ui/button'
import React, { ReactNode } from 'react'

const PrimaryButton = ({children,onClick}:{children:ReactNode,onClick:()=>void}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default PrimaryButton