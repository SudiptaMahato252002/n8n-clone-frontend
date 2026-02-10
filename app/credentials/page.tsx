'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const page = () => {
  const [platform, setPlatform] = useState('')

  return (
    <form>
      {/* Common */}
      <input
        type="text"
        placeholder="Credential Name"
      />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="">Select Platform</option>
        <option value="RESEND_EMAIL">Resend Email</option>
        <option value="TELEGRAM">Telegram</option>
        <option value="GEMINI">Gemini</option>
      </select>

      {/* Resend */}
      {platform === 'RESEND_EMAIL' && (
        <>
          <input
            type="text"
            placeholder="Resend API Key"
          />

          <input
            type="email"
            placeholder="From Email"
          />

           <div>
            <label className='block text-sm font-medium mb-2'>Resend API Key</label>
            <input
              type='text'
            //   value={apiKey}
            //   onChange={(e) => setApiKey(e.target.value)}
              placeholder='re_...'
              required
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <p className='text-xs text-gray-500 mt-1'>
              Get your API key from{' '}
              <a href='https://resend.com/api-keys' target='_blank' className='text-blue-600 hover:underline'>
                resend.com
              </a>
            </p>
          </div>
        </>
      )}

      {/* Telegram */}
      {platform === 'TELEGRAM' && (
        <>
          <input
            type="text"
            placeholder="Telegram Bot Token"
          />

          <input
            type="text"
            placeholder="Telegram Chat ID"
          />
        </>
      )}

      {/* Gemini */}
      {platform === 'GEMINI' && (
        <input
          type="text"
          placeholder="Gemini API Key"
        />
      )}

      <Button type="submit">
        Save Credentials
      </Button>
    </form>
  )
}

export default page