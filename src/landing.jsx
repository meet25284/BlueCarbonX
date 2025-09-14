import { useNavigate } from 'react-router'
import './App.css'
import Footer from './components/ui/Footer'
import Header from './components/ui/Header'
import VerifierApp from './components/VerifierApp'


function Landing() {
  const navigate = useNavigate()
  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            BlueCarbonX – Blockchain-Based Blue Carbon Registry & MRV System
          </h1>
          <p className="hero-subtitle">
            Measure, Verify, and Trade Carbon Credits with Transparency.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large">Login as Producer</button>
            <button className="btn btn-secondary btn-large" onClick={() => navigate('/verifier')}>Login as Verifier</button>
            <button className="btn btn-outline btn-large">Explore Marketplace</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <h2>About BlueCarbonX</h2>
            <p>BlueCarbonX is a blockchain-based platform that enables transparent and verifiable carbon credit generation from blue carbon ecosystems like mangroves and seagrass.

            By combining Monitoring, Reporting, and Verification (MRV) with decentralized storage (IPFS) and tokenization (ERC-1155 credits on Polygon), BlueCarbonX empowers:
</p><br/>
            <p className="pointer"><p>🌱 Producers to register projects and upload MRV data</p><br/>

            <p>✅ Verifiers to validate evidence and approve credits
</p><br/>
            <p>💱 Buyers to purchase and retire carbon credits transparently</p><br/></p>
            <p>Our mission is to make carbon markets trustworthy, scalable, and accessible, helping organizations contribute to global climate goals with confidence.</p>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-content">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon producer-icon">
                <span className="icon-leaf">🌿</span>
              </div>
              <div className="feature-header">
                <span className="feature-title-icon">🌱</span>
                <h3>Producer</h3>
              </div>
              <p className="feature-subtitle">Register projects & upload MRV data</p>
              <ul className="feature-list">
                <li>Register blue carbon projects</li>
                <li>Upload MRV documentation</li>
                <li>Track project progress</li>
                <li>Manage carbon credit inventory</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon verifier-icon">
                <span className="icon-check">✓</span>
              </div>
              <div className="feature-header">
                <span className="feature-title-icon">✅</span>
                <h3>Verifier</h3>
              </div>
              <p className="feature-subtitle">Approve MRV & authorize credit minting</p>
              <ul className="feature-list">
                <li>Review MRV submissions</li>
                <li>Verify project authenticity</li>
                <li>Approve credit minting</li>
                <li>Maintain verification standards</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon marketplace-icon">
                <span className="icon-cart">💱</span>
              </div>
              <div className="feature-header">
                <span className="feature-title-icon">💰</span>
                <h3>Marketplace</h3>
              </div>
              <p className="feature-subtitle">Buy & retire carbon credits</p>
              <ul className="feature-list">
                <li>Browse verified credits</li>
                <li>Purchase with MATIC</li>
                <li>Retire credits for offsetting</li>
                <li>Track transaction history</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}


export default Landing
