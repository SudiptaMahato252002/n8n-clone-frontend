'use client'
import React, { ChangeEvent } from 'react'


type InputProps = {
  label: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'password'
  value?: string
  required?: boolean
  disabled?: boolean
}


const Input = ({label,placeholder,onChange,type,value,required=false,disabled=false}:InputProps) => {
  return (
    <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-gray-700'>{label}</label>
        <input className='border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black' placeholder={placeholder} onChange={onChange} type={type} value={value} required={required} disabled={disabled}></input>
    </div>
  )
}

export default Input