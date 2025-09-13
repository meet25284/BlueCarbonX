import React from 'react'

const Header = () => {
  return (
    <header className="header">
        <div className="header-content">
          <div className="logo"><img src="src/assets/icon.png" />
            <h2>BlueCarbonX</h2>
          </div>
          <div className="header-buttons">
            <button className="btn btn-outline">Register</button>
            <button className="btn btn-primary">Connect Wallet</button>
          </div>
        </div>
      </header>
  )
}

export default Header
