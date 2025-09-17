import React from 'react'
import { Link } from 'react-router-dom'
import img from '/cart.png'
export default function FloatingCartButton({ cartItemCount }) {
  return (
    <div className="mc-fab">
      <Link to="/marketplace/cart" className="text-white">
        <span className="text-xl"><img src={img} height='27px' width='28px'/></span>
      </Link>
    </div>
  )
}
