import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './landing'
import RegisterFrontend from './components/RegisterFrontend'
import About from './components/About'
import Documentation from './components/Documentation'
import GitHub from './components/GitHub'
import Contact from './components/Contact'
import VerifierApp from './components/VerifierApp'

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
      </Routes>
    </Router>
  )
}

export default App
