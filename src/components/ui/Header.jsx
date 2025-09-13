import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined'
  }

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      alert('MetaMask is not installed. Please install MetaMask to continue.')
      return
    }

    setIsLoading(true)
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        setIsConnected(true)
        console.log('Connected to MetaMask:', accounts[0])
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error)
      if (error.code === 4001) {
        alert('Please connect to MetaMask to continue.')
      } else {
        alert('Failed to connect to MetaMask. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount('')
    setIsConnected(false)
    console.log('Disconnected from MetaMask')
  }

  // Check if already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          })
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsConnected(true)
          }
        } catch (error) {
          console.error('Error checking MetaMask connection:', error)
        }
      }
    }

    checkConnection()

    // Listen for account changes
    if (isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setIsConnected(false)
          setAccount('')
        } else {
          setAccount(accounts[0])
          setIsConnected(true)
        }
      })
    }

    // Cleanup event listener
    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum.removeListener('accountsChanged', () => {})
      }
    }
  }, [])

  // Format account address for display
  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="header">
        <div className="header-content">
          <div className="logo"><img src="src/assets/icon.png" />
            <h2>BlueCarbonX</h2>
          </div>
          <div className="header-buttons">
            <button className="btn btn-outline">Register</button>
            {isConnected ? (
              <div className="wallet-info">
                <span className="wallet-address">{formatAddress(account)}</span>
                <button 
                  className="btn btn-primary" 
                  onClick={disconnectWallet}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={connectWallet}
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </header>
  )
}

export default Header
