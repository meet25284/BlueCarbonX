import React, { useState } from 'react'

export default function QuantityModal({ isOpen, onClose, onConfirm, availableStock, itemName }) {
  const [quantity, setQuantity] = useState(1)
  if (!isOpen) return null
  return (
    <div className="mc-modal-backdrop">
      <div className="mc-modal">
        <h3 className="text-xl font-bold mb-4">Buy {itemName}</h3>
        <p className="mb-2 text-gray-700">Available: {availableStock}</p>
        <input
          type="number"
          min="1"
          max={availableStock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="mc-input" style={{width:'100%', marginBottom: '16px'}}
        />
        <div style={{display:'flex', justifyContent:'flex-end', gap:'8px'}}>
          <button onClick={onClose} className="mc-button">Cancel</button>
          <button onClick={() => onConfirm(quantity)} className="mc-button mc-btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
