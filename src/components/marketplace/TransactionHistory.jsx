import React from 'react'

const TransactionHistory = ({ transactions }) => {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="mc-page" style={{paddingTop:'32px', paddingBottom:'32px'}}>
      <div className="mc-container">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-custom-blue mb-6">Transaction History</h1>

        {sorted.length === 0 ? (
          <p className="text-gray-600">No transactions recorded yet.</p>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-200">
            <ul>
              {sorted.map((t) => (
                <li key={t.id} className="py-5 border-b last:border-b-0">
                  <p className="text-gray-900"><span className="font-semibold">Item:</span> {t.itemName}</p>
                  <p className="text-gray-900"><span className="font-semibold">Quantity:</span> {t.quantity}</p>
                  <p className="text-gray-900"><span className="font-semibold">Date:</span> {new Date(t.date).toLocaleString()}</p>
                  <p className="text-gray-900"><span className="font-semibold">Total Price:</span> {t.totalPrice.toFixed(2)} MATIC</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionHistory
