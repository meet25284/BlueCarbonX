import React, { useState } from 'react'

export default function RemoveQuantityModal({ isOpen, onClose, onConfirm, itemName, maxQuantity }) {
  const [quantity, setQuantity] = useState(1)
  if (!isOpen) return null
  return (
    <div className="mc-modal-backdrop">
      <div className="mc-modal">
        <h3 className="text-xl font-bold mb-4">Remove from cart</h3>
        <p className="mb-2 text-gray-700">Item: {itemName}</p>
        <p className="mb-2 text-gray-700">Max removable: {maxQuantity}</p>
        <input
          type="number"
          min="1"
          max={maxQuantity}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="mc-input" style={{width:'100%', marginBottom: '16px'}}
        />
        <div style={{display:'flex', justifyContent:'flex-end', gap:'8px'}}>
          <button onClick={onClose} className="mc-button">Cancel</button>
          <button onClick={() => onConfirm(quantity)} className="mc-button" style={{background:'#ef4444', color:'#fff'}}>Remove</button>
        </div>
      </div>
    </div>
  )
}
