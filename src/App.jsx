import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './components/marketplace/styles/common.css'
import Landing from './landing'
import RegisterFrontend from './components/RegisterFrontend'
import About from './components/About'
import Documentation from './components/Documentation'
import GitHub from './components/GitHub'
import Contact from './components/Contact'
import VerifierApp from './components/VerifierApp'
import MarketplaceApp from './components/marketplace/MarketplaceApp'
import ProducerDashboard from './components/producer/ProducerDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<RegisterFrontend />} />
        <Route path="/about" element={<About />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/github" element={<GitHub />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verifier" element={<VerifierApp />} />
        <Route path="/marketplace/*" element={<MarketplaceApp />} />
        <Route path="/producer" element={<ProducerDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
