import React from 'react'
import { Link } from 'react-router-dom'

export default function FloatingCartButton({ cartItemCount }) {
  return (
    <div className="mc-fab">
      <Link to="/marketplace/cart" className="text-white">
        <span className="text-xl">🛒</span>
      </Link>
    </div>
  )
}
