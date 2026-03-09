import React, { ReactNode } from 'react'

const Modal = ({children}:{children:ReactNode}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
        <div style={{
          background: '#1a1a1a',
          borderRadius: '8px',
          padding: '24px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflow: 'auto',
          border: '1px solid #333',
        }}>
            {children}
        </div>
    </div>
  )
}

export default Modal