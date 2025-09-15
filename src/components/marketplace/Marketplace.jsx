import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuantityModal from './QuantityModal'

export default function Marketplace({ listingsData = [], cart = [], addToCart, showNotification }) {
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("All")
  const [sort, setSort] = useState("low")
  const [methodologyFilter, setMethodologyFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(false)
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const navigate = useNavigate()

  const handleClearFilters = () => {
    setIsLoading(true)
    setTimeout(() => {
      setSearch("")
      setRegion("All")
      setSort("low")
      setMethodologyFilter("All")
      setIsLoading(false)
    }, 300)
  }

  useEffect(() => {
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(t)
  }, [search, region, sort, methodologyFilter])

  const term = (search || "").toLowerCase()
  let listings = (listingsData || []).filter(item =>
    (item?.name || "").toLowerCase().includes(term) ||
    (item?.id || "").toLowerCase().includes(term)
  )

  if (region !== "All") {
    listings = listings.filter(item => item?.region === region)
  }

  if (methodologyFilter !== "All") {
    listings = listings.filter(item => item?.methodology === methodologyFilter)
  }

  listings = [...listings].sort((a, b) => (sort === "low" ? (a?.price || 0) - (b?.price || 0) : (b?.price || 0) - (a?.price || 0)))

  const totalAvailable = listings.reduce((sum, item) => sum + (item?.available || 0), 0)

  const regionCounts = {}
  ;(listingsData || []).forEach(it => {
    const r = it?.region || "Unknown"
    regionCounts[r] = (regionCounts[r] || 0) + 1
  })

  let mostActiveRegion = "N/A"
  let maxCount = 0
  Object.keys(regionCounts).forEach(r => {
    if (regionCounts[r] > maxCount) {
      maxCount = regionCounts[r]
      mostActiveRegion = r
    }
  })

  const uniqueMethodologies = [...new Set((listingsData || []).map(i => i?.methodology).filter(Boolean))]
  const uniqueRegions = [...new Set((listingsData || []).map(i => i?.region).filter(Boolean))]

  const renderListing = (item) => {
    const currentItemInCart = (cart || []).find(ci => ci.id === item.id)
    const currentQuantityInCart = currentItemInCart ? currentItemInCart.quantity : 0
    const remainingAvailable = (item?.available || 0) - currentQuantityInCart
    const description = item?.description || ""

    return (
      <div
        key={item.id}
        className="mc-listing-card"
        onClick={() => navigate(`/marketplace/listings/${item.id}`)}
      >
        <h3 style={{fontWeight:700, fontSize:'18px', marginBottom:'8px'}}>{item.name}</h3>
        <p style={{fontSize:'14px', color:'#4b5563', marginBottom:'4px'}}><b>Region:</b> {item.region}</p>
        <p style={{fontSize:'14px', color:'#4b5563', marginBottom:'4px'}}><b>Methodology:</b> <span className="mc-chip">{item.methodology}</span></p>
        <p style={{fontSize:'14px', color:'#4b5563', marginBottom:'4px'}}><b>Year of Credit:</b> {item.vintage}</p>
        <p style={{fontSize:'14px', color:'#4b5563', marginBottom:'4px'}}><b>Available:</b>{' '}
          {remainingAvailable <= 0 ? (
            <span className="mc-badge mc-badge--warn">Out of Stock</span>
          ) : (
            <span className={`mc-badge ${remainingAvailable < 100 ? 'mc-badge--warn' : 'mc-badge--ok'}`}>{remainingAvailable}</span>
          )}
        </p>

        <p style={{fontSize:'14px', color:'#374151', marginTop:'8px'}}>
          {description.length > 100 ? (
            <>
              {description.substring(0, 100)}...
              <span
                onClick={(e) => { e.stopPropagation(); navigate(`/marketplace/listings/${item.id}`) }}
                style={{color:'var(--mc-blue)', cursor:'pointer', marginLeft:4, textDecoration:'underline'}}
              >
                Read More
              </span>
            </>
          ) : description}
        </p>

        <div style={{fontSize:'20px', fontWeight:800, marginTop:'8px', color:'var(--mc-blue)'}}>{item.price} MATIC / credit</div>

        <div style={{display:'flex', gap:'8px', marginTop:'16px'}}>
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedItem(item); setShowQuantityModal(true) }}
            className={`mc-button mc-btn-primary`}
            style={{flex:1, opacity: remainingAvailable <= 0 ? 0.6 : 1, cursor: remainingAvailable <= 0 ? 'not-allowed' : 'pointer'}}
            disabled={remainingAvailable <= 0}
          >
            Buy
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/marketplace/listings/${item.id}`) }}
            className="mc-button mc-btn-outline"
            style={{flex:1}}
          >
            View Details
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mc-page">
      <main className="py-8">
        <div className="mc-container">
          <div className="mb-8 text-center">
            <h1 className="mc-heading-xl">Discover Blue Carbon Credits</h1>
            <p className="mc-subtitle">Invest in a sustainable future by supporting vital marine ecosystems.</p>
          </div>

          <h2 className="mc-section-title">Marketplace</h2>

          <div className="mc-stats">
            <div className="mc-card mc-stat"><p className="mc-stat-label">Listings</p><p className="mc-stat-value">{listings.length}</p></div>
            <div className="mc-card mc-stat"><p className="mc-stat-label">Total Available Credits</p><p className="mc-stat-value">{totalAvailable}</p></div>
            <div className="mc-card mc-stat"><p className="mc-stat-label">Most Active Region</p><p className="mc-stat-value">{mostActiveRegion}</p></div>
          </div>

          <div className="mc-controls">
            <input type="text" placeholder="Search by project or token ID" value={search} onChange={e => setSearch(e.target.value)} className="mc-input" />
            <select value={region} onChange={e => setRegion(e.target.value)} className="mc-select"><option>All</option>{uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}</select>
            <select value={methodologyFilter} onChange={e => setMethodologyFilter(e.target.value)} className="mc-select"><option>All</option>{uniqueMethodologies.map(m => <option key={m} value={m}>{m}</option>)}</select>
            <select value={sort} onChange={e => setSort(e.target.value)} className="mc-select"><option value="low">Sort: Lowest price</option><option value="high">Sort: Highest price</option></select>
            <button onClick={handleClearFilters} className="mc-button">Clear Filters</button>
          </div>

          <div className="mc-grid">
          {isLoading ? (
            <div className="col-span-full py-10 flex flex-col items-center justify-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <p className="text-custom-blue text-xl font-semibold">Loading listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <p className="text-center text-xl text-gray-600 col-span-full py-10">No listings found matching your criteria.</p>
          ) : (
            listings.map(renderListing)
          )}
          </div>
        </div>
      </main>

      {selectedItem && (
        <QuantityModal
          isOpen={showQuantityModal}
          onClose={() => setShowQuantityModal(false)}
          onConfirm={(quantity) => {
            addToCart(selectedItem, quantity)
            showNotification && showNotification(`Added ${quantity} of ${selectedItem.name} to cart!`)
            setShowQuantityModal(false)
          }}
          availableStock={(selectedItem?.available || 0) - ((cart || []).find(c => c.id === selectedItem.id)?.quantity || 0)}
          itemName={selectedItem?.name || ""}
          showNotification={showNotification}
        />
      )}
    </div>
  )
}
