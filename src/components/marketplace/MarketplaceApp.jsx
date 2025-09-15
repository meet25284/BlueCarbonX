import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Marketplace from './Marketplace'
import ListingDetail from './ListingDetail'
import Cart from './Cart'
import FloatingCartButton from './FloatingCartButton'
import Sidebar from './Sidebar'
import TransactionHistory from './TransactionHistory'
import Notification from './Notification'
import Portfolio from './Portfolio'

function MarketplaceApp() {
  const initialListingsData = [
    { id: "TK-002", name: "Seagrass Bay", region: "West Africa", methodology: "VM0007", vintage: 2021, available: 340, price: 2.1, imageUrl: "https://i.ibb.co/hKzK2tV/image3.jpg", description: "This project focuses on the vital restoration of seagrass meadows along the West African coast. These underwater ecosystems are critical for marine biodiversity, serving as nurseries for numerous fish species and improving water quality. By sequestering carbon at an impressive rate, Seagrass Bay contributes significantly to climate change mitigation while supporting local fishing communities through enhanced marine life.",
      carbonSequestrationRate: "10 tons/hectare/year",
      biodiversityImpact: "High (Increased fish populations, improved marine habitats)",
      communityBenefits: "Moderate (Local employment, ecotourism opportunities)",
      priceHistory: [{ year: 2020, price: 1.8 }, { year: 2021, price: 2.0 }, { year: 2022, price: 2.1 }, { year: 2023, price: 2.3 }, { year: 2024, price: 2.5 }],
      vintageHistory: [{ year: 2020, credits: 300 }, { year: 2021, credits: 340 }, { year: 2022, credits: 360 }, { year: 2023, credits: 380 }, { year: 2024, credits: 400 }],
    },
    { id: "TK-001", name: "Mangrove Delta", region: "SE Asia", methodology: "VM0033", vintage: 2022, available: 100, price: 2.5, imageUrl: "https://i.ibb.co/C0W2wHq/image1.jpg", description: "Located in the heart of Southeast Asia, the Mangrove Delta project is dedicated to protecting and replanting mangrove forests. These incredible ecosystems act as natural barriers against coastal erosion and storm surges, safeguarding communities. Beyond their crucial role in carbon absorption, mangroves provide rich habitats for a diverse array of bird and marine life, supporting sustainable livelihoods for local populations through fishing and ecotourism.",
      carbonSequestrationRate: "15 tons/hectare/year",
      biodiversityImpact: "High (Rich bird and marine life habitat, nursery grounds)",
      communityBenefits: "High (Coastal protection, sustainable livelihoods, education)",
      priceHistory: [{ year: 2020, price: 2.2 }, { year: 2021, price: 2.3 }, { year: 2022, price: 2.5 }, { year: 2023, price: 2.4 }, { year: 2024, price: 2.6 }],
      vintageHistory: [{ year: 2020, credits: 90 }, { year: 2021, credits: 95 }, { year: 2022, credits: 100 }, { year: 2023, credits: 110 }, { year: 2024, credits: 120 }],
    },
    { id: "TK-004", name: "Mangrove Delta", region: "SE Asia", methodology: "VM0033", vintage: 2023, available: 420, price: 2.7, imageUrl: "https://i.ibb.co/C0W2wHq/image1.jpg", description: "This expansion project within the Mangrove Delta region aims to further enhance carbon sequestration and deliver significant local community benefits. By restoring degraded mangrove areas, it improves water quality, provides critical habitats for various species, and offers flood mitigation for vulnerable coastal communities. Sustainable artisanal fishing is also supported, ensuring long-term ecological and economic resilience.",
      carbonSequestrationRate: "14 tons/hectare/year",
      biodiversityImpact: "High (Habitat for various species, improved water quality)",
      communityBenefits: "High (Flood mitigation, artisanal fishing support)",
      priceHistory: [{ year: 2020, price: 2.5 }, { year: 2021, price: 2.6 }, { year: 2022, price: 2.7 }, { year: 2023, price: 2.8 }, { year: 2024, price: 2.9 }],
      vintageHistory: [{ year: 2020, credits: 400 }, { year: 2021, credits: 410 }, { year: 2022, credits: 420 }, { year: 2023, credits: 430 }, { year: 2024, credits: 440 }],
    },
    { id: "TK-003", name: "Saltmarsh Cove", region: "Europe", methodology: "VM0033", vintage: 2020, available: 50, price: 2.9, imageUrl: "https://i.ibb.co/Tq54k7Y/image2.jpg", description: "The Saltmarsh Cove project focuses on conserving the precious European saltmarshes. These unique ecosystems are natural flood defenses, protecting inland areas from rising sea levels and storm surges. Beyond their role as significant carbon sinks, saltmarshes provide habitats for migratory birds and unique flora. This project contributes to coastal erosion control and fosters minor research opportunities, highlighting the importance of these often-overlooked habitats.",
      carbonSequestrationRate: "8 tons/hectare/year",
      biodiversityImpact: "Medium (Habitat for migratory birds, unique flora)",
      communityBenefits: "Low (Coastal erosion control, minor research opportunities)",
      priceHistory: [{ year: 2020, price: 2.7 }, { year: 2021, price: 2.8 }, { year: 2022, price: 2.9 }, { year: 2023, price: 3.0 }, { year: 2024, price: 3.1 }],
      vintageHistory: [{ year: 2020, credits: 45 }, { year: 2021, credits: 50 }, { year: 2022, credits: 55 }, { year: 2023, credits: 60 }, { year: 2024, credits: 65 }],
    },
    { id: "TK-005", name: "Sundarban Forest", region: "India", methodology: "VM0007", vintage: 2022, available: 200, price: 3.2, imageUrl: "https://i.ibb.co/0y4Zp27/image4.jpg", description: "This critical project safeguards the unique Sundarbans, a UNESCO World Heritage site and the largest mangrove forest in the world. It's not only a vital tiger habitat but also a global carbon hotspot, absorbing vast amounts of atmospheric CO2. The initiative focuses on flood protection for surrounding communities, sustainable forestry practices, and supporting the traditional livelihoods of local populations, ensuring the long-term health of this irreplaceable ecosystem.",
      carbonSequestrationRate: "18 tons/hectare/year",
      biodiversityImpact: "Very High (Tiger habitat, diverse aquatic and terrestrial species)",
      communityBenefits: "High (Flood protection, sustainable forestry, local livelihoods)",
      priceHistory: [{ year: 2020, price: 3.0 }, { year: 2021, price: 3.1 }, { year: 2022, price: 3.2 }, { year: 2023, price: 3.3 }, { year: 2024, price: 3.4 }],
      vintageHistory: [{ year: 2020, credits: 180 }, { year: 2021, credits: 190 }, { year: 2022, credits: 200 }, { year: 2023, credits: 210 }, { year: 2024, credits: 220 }],
    },
    { id: "TK-006", name: "Amazonian Wetlands", region: "Brazil", methodology: "VM0033", vintage: 2023, available: 500, price: 2.0, imageUrl: "https://i.ibb.co/VMyh021/image5.jpg", description: "The Amazonian Wetlands project is dedicated to preserving the immense biodiversity and carbon-rich wetlands of the Amazon basin, an area vital for global climate regulation and ecological balance. This initiative supports thousands of endemic species, protects critical freshwater sources, and works closely with indigenous communities to ensure sustainable resource management. Investing in this project helps safeguard one of Earth's most crucial ecosystems and empowers its traditional guardians.",
      carbonSequestrationRate: "12 tons/hectare/year",
      biodiversityImpact: "Very High (Thousands of endemic species, critical freshwater source)",
      communityBenefits: "High (Indigenous community support, sustainable resource management)",
      priceHistory: [{ year: 2020, price: 1.9 }, { year: 2021, price: 1.95 }, { year: 2022, price: 2.0 }, { year: 2023, price: 2.05 }, { year: 2024, price: 2.1 }],
      vintageHistory: [{ year: 2020, credits: 480 }, { year: 2021, credits: 490 }, { year: 2022, credits: 500 }, { year: 2023, credits: 510 }, { year: 2024, credits: 520 }],
    },
  ]

  const [listings, setListings] = useState(initialListingsData)
  const [cart, setCart] = useState([])
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions')
    const defaultTransactions = [
      { id: 'TRX-20230115-TK-001', itemName: 'Mangrove Delta', quantity: 10, price: 2.5, totalPrice: 25, date: '2023-01-15T10:00:00Z' },
      { id: 'TRX-20230220-TK-003', itemName: 'Saltmarsh Cove', quantity: 15, price: 2.9, totalPrice: 43.5, date: '2023-02-20T11:00:00Z' },
      { id: 'TRX-20230310-TK-001', itemName: 'Mangrove Delta', quantity: 20, price: 2.5, totalPrice: 50, date: '2023-03-10T12:00:00Z' },
      { id: 'TRX-20230405-TK-005', itemName: 'Sundarban Forest', quantity: 18, price: 3.2, totalPrice: 57.6, date: '2023-04-05T13:00:00Z' },
      { id: 'TRX-20230522-TK-006', itemName: 'Amazonian Wetlands', quantity: 25, price: 2.0, totalPrice: 50, date: '2023-05-22T14:00:00Z' },
      { id: 'TRX-20230618-TK-001', itemName: 'Mangrove Delta', quantity: 12, price: 2.5, totalPrice: 30, date: '2023-06-18T15:00:00Z' },
      { id: 'TRX-20230701-TK-003', itemName: 'Saltmarsh Cove', quantity: 8, price: 2.9, totalPrice: 23.2, date: '2023-07-01T09:00:00Z' },
      { id: 'TRX-20230811-TK-005', itemName: 'Sundarban Forest', quantity: 22, price: 3.2, totalPrice: 70.4, date: '2023-08-11T16:00:00Z' },
      { id: 'TRX-20230903-TK-006', itemName: 'Amazonian Wetlands', quantity: 15, price: 2.0, totalPrice: 30, date: '2023-09-03T10:30:00Z' },
      { id: 'TRX-20231025-TK-001', itemName: 'Mangrove Delta', quantity: 30, price: 2.5, totalPrice: 75, date: '2023-10-25T11:45:00Z' },
      { id: 'TRX-20231112-TK-003', itemName: 'Saltmarsh Cove', quantity: 10, price: 2.9, totalPrice: 29, date: '2023-11-12T12:15:00Z' },
      { id: 'TRX-20231230-TK-005', itemName: 'Sundarban Forest', quantity: 14, price: 3.2, totalPrice: 44.8, date: '2023-12-30T10:00:00Z' },
      { id: 'TRX-20240108-TK-004', itemName: 'Mangrove Delta', quantity: 28, price: 2.7, totalPrice: 75.6, date: '2024-01-08T14:00:00Z' },
      { id: 'TRX-20240219-TK-006', itemName: 'Amazonian Wetlands', quantity: 18, price: 2.0, totalPrice: 36, date: '2024-02-19T09:30:00Z' },
      { id: 'TRX-20240307-TK-001', itemName: 'Mangrove Delta', quantity: 25, price: 2.5, totalPrice: 62.5, date: '2024-03-07T13:00:00Z' },
      { id: 'TRX-20240428-TK-003', itemName: 'Saltmarsh Cove', quantity: 11, price: 2.9, totalPrice: 31.9, date: '2024-04-28T16:00:00Z' },
      { id: 'TRX-20240515-TK-005', itemName: 'Sundarban Forest', quantity: 17, price: 3.2, totalPrice: 54.4, date: '2024-05-15T10:00:00Z' },
      { id: 'TRX-20240601-TK-004', itemName: 'Mangrove Delta', quantity: 35, price: 2.7, totalPrice: 94.5, date: '2024-06-01T11:00:00Z' },
      { id: 'TRX-20240720-TK-006', itemName: 'Amazonian Wetlands', quantity: 20, price: 2.0, totalPrice: 40, date: '2024-07-20T14:00:00Z' },
      { id: 'TRX-20240805-TK-001', itemName: 'Mangrove Delta', quantity: 15, price: 2.5, totalPrice: 37.5, date: '2024-08-05T09:00:00Z' },
      { id: 'TRX-20240912-TK-003', itemName: 'Saltmarsh Cove', quantity: 9, price: 2.9, totalPrice: 26.1, date: '2024-09-12T15:00:00Z' },
      { id: 'TRX-20241001-TK-005', itemName: 'Sundarban Forest', quantity: 20, price: 3.2, totalPrice: 64, date: '2024-10-01T10:00:00Z' },
    ]
    const filteredTransactions = defaultTransactions.filter(t => new Date(t.date).getFullYear() !== 2025)
    return savedTransactions ? JSON.parse(savedTransactions) : filteredTransactions
  })

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notification, setNotification] = useState({ message: '', type: 'success' })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
  }

  const clearNotification = () => {
    setNotification({ message: '', type: 'success' })
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const addToCart = (item, quantity) => {
    if (isNaN(quantity) || quantity <= 0) {
      return
    }
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id)
      if (existingItemIndex > -1) {
        const newCart = [...prevCart]
        newCart[existingItemIndex].quantity += quantity
        return newCart
      } else {
        return [...prevCart, { ...item, quantity }]
      }
    })
  }

  const processCheckout = () => {
    if (cart.length === 0) {
      showNotification("Your cart is empty!", 'error')
      return
    }
    setListings(prevListings => prevListings.map(listing => {
      const cartItem = cart.find(item => item.id === listing.id)
      if (cartItem) {
        return { ...listing, available: Math.max(0, listing.available - cartItem.quantity) }
      }
      return listing
    }))

    const newTransactions = cart.map(item => ({
      id: `TRX-${Date.now()}-${item.id}`,
      itemName: item.name,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.price * item.quantity,
      date: new Date().toISOString(),
    }))

    setTransactions(prev => [...newTransactions, ...prev])
    localStorage.setItem('transactions', JSON.stringify([...newTransactions, ...transactions]))
    setCart([])
    showNotification("Purchase complete! Check your transaction history.", 'success')
  }

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="mc-shell">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      {!sidebarOpen && (
        <button onClick={toggleSidebar} className="mc-hamburger">☰</button>
      )}
      <div className={`mc-shell-content ${sidebarOpen ? 'open' : ''}`}>
        <Routes>
          <Route path="" element={<Marketplace listingsData={listings} cart={cart} addToCart={addToCart} showNotification={showNotification} />} />
          <Route path="listings/:id" element={<ListingDetail listingsData={listings} addToCart={addToCart} cart={cart} showNotification={showNotification} />} />
          <Route path="cart" element={<Cart cart={cart} setCart={setCart} setListings={setListings} listingsData={listings} processCheckout={processCheckout} showNotification={showNotification} />} />
          <Route path="transaction-history" element={<TransactionHistory transactions={transactions} />} />
          <Route path="portfolio" element={<Portfolio transactions={transactions} />} />
        </Routes>
        <FloatingCartButton cartItemCount={cart.length} />
      </div>
      <Notification message={notification.message} type={notification.type} onClose={clearNotification} />
    </div>
  )
}

export default MarketplaceApp
