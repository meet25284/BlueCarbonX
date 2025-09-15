import React from 'react'
import { Link } from 'react-router-dom'
import RemoveQuantityModal from './RemoveQuantityModal'

export default function Cart({ cart, setCart, listingsData, processCheckout, showNotification }) {
  const [showRemoveQuantityModal, setShowRemoveQuantityModal] = React.useState(false)
  const [itemToRemove, setItemToRemove] = React.useState(null)

  const updateQuantity = (id, newQuantity) => {
    newQuantity = parseInt(newQuantity, 10)
    if (isNaN(newQuantity) || newQuantity < 1) {
      showNotification("Please enter a valid quantity.", 'error')
      return
    }
    setCart(prevCart => {
      const oldItem = prevCart.find(item => item.id === id)
      if (!oldItem) return prevCart
      const originalListing = listingsData.find(listing => listing.id === id)
      if (!originalListing) return prevCart
      const totalAvailable = originalListing.available
      if (newQuantity > totalAvailable) {
        showNotification(`Cannot add more. Only ${totalAvailable} credits available for ${oldItem.name}.`, 'error')
        return prevCart
      }
      return prevCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    })
  }

  const handleRemoveClick = (item) => {
    setItemToRemove(item)
    setShowRemoveQuantityModal(true)
  }

  const confirmRemoveItem = (quantityToRemove) => {
    if (!itemToRemove) return
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemToRemove.id)
      if (!existingItem) return prevCart
      if (quantityToRemove >= existingItem.quantity) {
        showNotification(`${existingItem.name} removed from cart.`, 'info')
        return prevCart.filter(item => item.id !== itemToRemove.id)
      } else {
        showNotification(`${quantityToRemove} of ${existingItem.name} removed from cart.`, 'info')
        return prevCart.map(item => item.id === itemToRemove.id ? { ...item, quantity: existingItem.quantity - quantityToRemove } : item)
      }
    })
    setShowRemoveQuantityModal(false)
    setItemToRemove(null)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return <div className="text-center p-6 text-xl text-gray-600">Your cart is empty. Add some credits from the <Link to="/marketplace" className="text-custom-blue hover:underline">Marketplace</Link>!</div>
  }

  return (
    <div className="mc-page" style={{paddingTop:'32px', paddingBottom:'32px'}}>
      <div className="mc-container">
        <div className="mc-card">
        <h2 className="text-3xl font-bold text-custom-blue mb-6">Your Shopping Cart</h2>
        <div className="space-y-4 mb-6">
          {cart.map(item => {
            const originalListing = listingsData.find(listing => listing.id === item.id)
            const maxAllowedQuantity = originalListing ? (originalListing.available + item.quantity) : item.quantity
            return (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.id}</p>
                  <p className="text-md text-gray-700">Price: {item.price} MATIC / credit</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max={maxAllowedQuantity}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="h-10 border border-gray-300 focus:border-custom-blue focus:ring-2 focus:ring-custom-blue/20 px-2 rounded-lg w-24 text-center mr-4 outline-none"
                  />
                  <button onClick={() => handleRemoveClick(item)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">Remove</button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex justify-end items-center text-2xl font-bold text-gray-800 mb-6">
          Total: {total.toFixed(2)} MATIC
        </div>
        <div className="flex justify-end">
          <button 
            onClick={() => { 
              processCheckout()
            }}
            className="mc-button mc-btn-primary" style={{height:'48px'}}
          >Proceed to Checkout</button>
        </div>
        </div>
      </div>
      {itemToRemove && (
        <RemoveQuantityModal
          isOpen={showRemoveQuantityModal}
          onClose={() => setShowRemoveQuantityModal(false)}
          onConfirm={confirmRemoveItem}
          itemName={itemToRemove.name}
          maxQuantity={itemToRemove.quantity}
          showNotification={showNotification}
        />
      )}
    </div>
  )
}
