import React from 'react'
import './styles/transaction-history.css'

const TransactionHistory = ({ transactions }) => {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="mc-page" style={{paddingTop:'32px', paddingBottom:'32px'}}>
      <div className="mc-container">
        <div className="mc-th-header">
          <h1 className="mc-th-title">Transaction History</h1>
          <span className="mc-th-subtitle">{sorted.length} total</span>
        </div>

        {sorted.length === 0 ? (
          <p className="mc-th-empty">No transactions recorded yet.</p>
        ) : (
          <div className="mc-th-card">
            <ul className="mc-th-list">
              {sorted.map((t) => (
                <li key={t.id} className="mc-th-item">
                  <div className="mc-th-row">
                    <div>
                      <div className="mc-th-label">Item</div>
                      <div className="mc-th-value">{t.itemName}</div>
                    </div>
                    <div>
                      <div className="mc-th-label">Quantity</div>
                      <div className="mc-th-value">{t.quantity}</div>
                    </div>
                    <div>
                      <div className="mc-th-label">Date</div>
                      <div className="mc-th-value">{new Date(t.date).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="mc-th-label">Total Price</div>
                      <div className="mc-th-amount">{t.totalPrice.toFixed(2)} MATIC</div>
                    </div>
                  </div>
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
