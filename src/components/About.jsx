import React from 'react'
import './About.css'

const About = () => {
  const aboutContent = `📘 About BlueCarbonX
🌍 What is BlueCarbonX?

BlueCarbonX is a blockchain-powered platform designed to make blue carbon projects (mangroves, seagrass, wetlands) transparent, measurable, and trustworthy. It combines scientific monitoring with decentralized technology to ensure carbon credits are generated and traded fairly.

🔑 Why Blue Carbon?

High efficiency: Blue carbon ecosystems capture up to 5x more CO₂ than terrestrial forests.

Climate resilience: Protecting mangroves & seagrass safeguards coastlines against storms, flooding, and erosion.

Biodiversity protection: These ecosystems support rich marine and coastal life.

Despite their importance, carbon credits from blue ecosystems are often underutilized due to lack of transparency in monitoring and verification.

⚙️ How BlueCarbonX Works

Producers register projects, map their area, and upload Monitoring, Reporting & Verification (MRV) evidence.

The MRV Engine calculates CO₂ sequestration using scientific models.

All MRV evidence is stored on IPFS (decentralized file storage), creating a tamper-proof record.

Verifiers review uploaded data, approve or reject claims, and digitally sign approvals.

Once verified, the system mints ERC-1155 carbon credit tokens on the Polygon blockchain.

Credits can then be listed on the marketplace, purchased by buyers, or retired to prove climate contribution.

👥 Key Roles in the System

Producers → register projects, upload MRV evidence, receive carbon credits.

Verifiers → validate MRV packages, approve/reject claims.

Buyers → purchase and retire verified carbon credits.

Admin → manage roles, oversee integrity, ensure compliance.

💡 Core Features

🌐 Blockchain Registry → ensures data integrity and transparency.

📦 IPFS Storage → secure and permanent evidence storage.

🪙 ERC-1155 Tokens → efficient, tradable, and retireable carbon credits.

🛒 Marketplace → enables transparent buying and selling of credits.

✅ Verification Workflow → ensures only legitimate credits are issued.

🎯 Mission & Vision

Mission: To make carbon markets transparent, accessible, and reliable, helping organizations invest in real climate solutions.

Vision: A future where every carbon credit represents real climate impact, backed by verifiable data and trusted by all.`

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />
      }
      
      // Handle headers (lines starting with 📘, 🌍, etc.)
      if (line.match(/^[📘🌍🔑⚙️👥💡🎯]/)) {
        return (
          <h2 key={index} className="about-header">
            {line}
          </h2>
        )
      }
      
      // Handle sub-headers (lines ending with :)
      if (line.endsWith(':')) {
        return (
          <h3 key={index} className="about-subheader">
            {line}
          </h3>
        )
      }
      
      // Handle bullet points
      if (line.startsWith('•') || line.startsWith('-')) {
        return (
          <li key={index} className="about-bullet">
            {line.substring(1).trim()}
          </li>
        )
      }
      
      // Handle arrow points (→)
      if (line.includes('→')) {
        return (
          <li key={index} className="about-arrow">
            {line}
          </li>
        )
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="about-paragraph">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-header-section">
          <h1>About BlueCarbonX</h1>
          <p>Learn more about our mission to revolutionize carbon markets</p>
        </div>
        
        <div className="about-content">
          {formatContent(aboutContent)}
        </div>
        
        <div className="about-back">
          <button
            onClick={() => window.history.back()}
            className="back-button"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
