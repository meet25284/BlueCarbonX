import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ListingDetail({ listingsData, addToCart, cart, showNotification }) {
  const { id } = useParams()
  const listing = listingsData.find(item => item.id === id)
  const [quantity, setQuantity] = useState(1)

  if (!listing) {
    return <div className="text-center p-6 text-xl">Listing not found.</div>
  }

  const currentItemInCart = cart.find(cartItem => cartItem.id === listing.id)
  const currentQuantityInCart = currentItemInCart ? currentItemInCart.quantity : 0
  const remainingAvailable = listing.available - currentQuantityInCart

  const handleAddToCart = () => {
    if (quantity <= 0 || isNaN(quantity)) {
      showNotification("Please enter a valid positive number for quantity.", 'error')
      return
    }
    if (quantity > remainingAvailable) {
      showNotification(`Insufficient stock. Only ${remainingAvailable} credits available for this item.`, 'error')
      return
    }
    addToCart(listing, quantity)
    showNotification(`${quantity} of ${listing.name} added to cart!`)
  }

  const combinedHistory = listing.priceHistory.map((priceItem, index) => ({
    year: priceItem.year,
    price: priceItem.price,
    credits: listing.vintageHistory[index].credits,
  }))

  return (
    <div className="mc-page" style={{paddingTop:'32px', paddingBottom:'32px'}}>
      <div className="mc-container">
        <div className="mc-card">
        <h2 className="text-3xl font-bold text-custom-blue mb-4">{listing.name} ({listing.id})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <p className="text-lg text-gray-700 flex justify-between items-center"><b>Region:</b> <span className="font-normal">{listing.region}</span></p>
          <p className="text-lg text-gray-700 flex justify-between items-center"><b>Methodology:</b> <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded font-normal">{listing.methodology}</span></p>
          <p className="text-lg text-gray-700 flex justify-between items-center"><b>Year of Credit:</b> <span className="font-normal">{listing.vintage}</span></p>
          <p className="text-lg text-gray-700 flex justify-between items-center"><b>Available:</b> 
            {remainingAvailable <= 0 ? (
              <span className="text-orange-600 font-bold bg-orange-100 px-2 py-0.5 rounded-full text-xs">Out of Stock</span>
            ) : (
              <span className={`${remainingAvailable < 100 ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'} px-2 py-0.5 rounded-full text-xs font-semibold`}>
                {remainingAvailable}
              </span>
            )}
          </p>
          <p className="text-lg text-gray-700 flex justify-between items-center"><b>Carbon Sequestration Rate:</b> <span className="font-normal">{listing.carbonSequestrationRate}</span></p>
          <p className="text-lg text-gray-700 flex justify-between items-center"><b>Biodiversity Impact:</b> <span className="font-normal">{listing.biodiversityImpact}</span></p>
          <p className="text-lg text-gray-700 flex justify-between items-center"><b>Community Benefits:</b> <span className="font-normal">{listing.communityBenefits}</span></p>
          <p className="text-lg text-gray-700 mt-4 col-span-full"><b>Description:</b> <span className="font-normal">{listing.description}</span></p>
          <p className="text-2xl font-bold text-custom-blue col-span-full">Price: {listing.price} MATIC / credit</p>
        </div>
        <div className="flex items-center mb-6 mt-8">
          <label htmlFor="quantity" className="mr-4 text-lg font-bold">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={remainingAvailable}
            value={remainingAvailable <= 0 ? 0 : quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="h-10 border border-gray-300 focus:border-custom-blue focus:ring-2 focus:ring-custom-blue/20 px-3 rounded-lg w-28 text-center outline-none"
            disabled={remainingAvailable <= 0}
          />
        </div>
        <button 
          onClick={handleAddToCart} 
          className={`bg-custom-blue text-white px-6 py-3 rounded-lg text-lg transition-colors duration-200 ${remainingAvailable <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-custom-blue-hover active:bg-custom-blue-active'}`}
          disabled={remainingAvailable <= 0}
        >Add to Cart</button>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Historical Data</h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={combinedHistory} margin={{"top": 5, "right": 30, "left": 20, "bottom": 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" name="Price (MATIC)" />
            <Line yAxisId="right" type="monotone" dataKey="credits" stroke="#82ca9d" name="Credits Available" />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
