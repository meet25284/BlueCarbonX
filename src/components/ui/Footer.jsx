import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <button onClick={() => handleNavigation('/about')} className="footer-link">About</button>
            <button onClick={() => handleNavigation('/documentation')} className="footer-link">Documentation</button>
            <button onClick={() => handleNavigation('/github')} className="footer-link">GitHub</button>
            <button onClick={() => handleNavigation('/contact')} className="footer-link">Contact</button>
          </div>
          <p>&copy; 2024 BlueCarbonX. All rights reserved.</p>
        </div>
      </footer>
  )
}

export default Footer
