import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ isOpen, onClose }) {
  const linkClasses = 'mc-navlink'
  return (
    <div className={`mc-sidebar ${isOpen ? '' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
      </div>
      <nav className="space-y-2">
        <Link to="/marketplace" className={linkClasses} onClick={onClose}>
          Marketplace
        </Link>
        <Link to="/marketplace/cart" className={linkClasses} onClick={onClose}>
          Cart
        </Link>
        <Link to="/marketplace/transaction-history" className={linkClasses} onClick={onClose}>
          Transaction History
        </Link>
        <Link to="/marketplace/portfolio" className={linkClasses} onClick={onClose}>
          Portfolio
        </Link>
      </nav>
      <div className="absolute bottom-4 left-4 text-xs text-white/70">© 2025 Blue Carbon</div>
    </div>
  )
}
