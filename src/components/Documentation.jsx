import React from 'react'
import './Documentation.css'

const Documentation = () => {
  const documentationContent = `📚 BlueCarbonX Documentation

🚀 Getting Started

Welcome to BlueCarbonX! This documentation will guide you through using our blockchain-based blue carbon registry and MRV system.

🔧 Platform Overview

BlueCarbonX is designed to make carbon markets transparent, accessible, and reliable. Our platform combines scientific monitoring with decentralized technology to ensure carbon credits are generated and traded fairly.

👥 User Roles & Permissions

🌱 Producer
- Register blue carbon projects
- Upload MRV (Monitoring, Reporting, Verification) data
- Track project progress and carbon credit generation
- Manage project documentation and permits

✅ Verifier
- Review and validate MRV submissions
- Verify project authenticity and compliance
- Approve or reject carbon credit claims
- Maintain verification standards and accreditation

💰 Buyer
- Browse verified carbon credits
- Purchase credits using MATIC cryptocurrency
- Retire credits for carbon offsetting
- Track transaction history and impact

🔐 Admin
- Manage user roles and permissions
- Oversee platform integrity
- Ensure compliance with standards
- Handle system maintenance and updates

📋 Step-by-Step Guides

For Producers:
1. Register your account and select "Producer" role
2. Complete project registration with location and type
3. Upload MRV documentation and evidence
4. Submit for verification
5. Monitor approval status and credit generation

For Verifiers:
1. Register with verification organization details
2. Provide accreditation documentation
3. Review submitted MRV packages
4. Validate evidence and approve/reject claims
5. Maintain verification records

For Buyers:
1. Register and specify purchase purpose
2. Browse available verified credits
3. Select credits and proceed to purchase
4. Complete payment with MATIC
5. Retire credits for offsetting

🔗 Technical Integration

Blockchain Integration:
- Built on Polygon network for low fees
- ERC-1155 token standard for carbon credits
- Smart contracts for automated verification
- IPFS storage for tamper-proof documentation

Wallet Integration:
- MetaMask support for Ethereum wallets
- WalletConnect for mobile wallet compatibility
- Secure transaction signing
- Real-time balance updates

API Documentation:
- RESTful API endpoints
- WebSocket for real-time updates
- Authentication with JWT tokens
- Rate limiting and security measures

📊 MRV Standards

Our platform follows international MRV standards:
- IPCC Guidelines for National Greenhouse Gas Inventories
- Verified Carbon Standard (VCS) methodologies
- Gold Standard for Global Goals
- ISO 14064 standards for carbon accounting

🔒 Security & Compliance

Data Security:
- End-to-end encryption for sensitive data
- Decentralized storage on IPFS
- Blockchain immutability
- Regular security audits

Compliance:
- GDPR compliance for data protection
- Carbon market regulations adherence
- International verification standards
- Transparent audit trails

📞 Support & Resources

Need help? We're here to assist:
- Technical support documentation
- Video tutorials and guides
- Community forums
- Direct support channels

📈 Best Practices

For Project Success:
- Maintain detailed MRV records
- Regular monitoring and reporting
- Transparent documentation
- Compliance with local regulations

For Verification:
- Thorough evidence review
- Consistent application of standards
- Clear communication with producers
- Regular training updates

For Purchasing:
- Verify credit authenticity
- Understand offset requirements
- Track retirement certificates
- Maintain purchase records`

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />
      }
      
      // Handle main headers (lines starting with 📚, 🚀, etc.)
      if (line.match(/^[📚🚀🔧👥📋🔗📊🔒📞📈]/)) {
        return (
          <h2 key={index} className="doc-header">
            {line}
          </h2>
        )
      }
      
      // Handle sub-headers (lines ending with :)
      if (line.endsWith(':') && !line.startsWith('📚')) {
        return (
          <h3 key={index} className="doc-subheader">
            {line}
          </h3>
        )
      }
      
      // Handle numbered lists
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="doc-numbered">
            {line}
          </li>
        )
      }
      
      // Handle bullet points
      if (line.startsWith('•') || line.startsWith('-')) {
        return (
          <li key={index} className="doc-bullet">
            {line.substring(1).trim()}
          </li>
        )
      }
      
      // Handle arrow points (→)
      if (line.includes('→')) {
        return (
          <li key={index} className="doc-arrow">
            {line}
          </li>
        )
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="doc-paragraph">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="documentation-container">
      <div className="documentation-wrapper">
        <div className="documentation-header-section">
          <h1>Documentation</h1>
          <p>Complete guide to using BlueCarbonX platform</p>
        </div>
        
        <div className="documentation-content">
          {formatContent(documentationContent)}
        </div>
        
        <div className="documentation-back">
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

export default Documentation
