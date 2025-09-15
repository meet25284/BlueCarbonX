import React, { useEffect } from 'react'

export default function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [message, onClose])

  if (!message) return null
  const bg = type === 'error' ? '#ef4444' : type === 'info' ? '#3b82f6' : '#10b981'

  return (
    <div className={`mc-note`} style={{background:bg}}>
      {message}
    </div>
  )
}
