import React from 'react'
import './GitHub.css'

const GitHub = () => {
  const githubContent = `🐙 BlueCarbonX GitHub Repository

🔗 Repository Information

Welcome to the BlueCarbonX open-source repository! Here you'll find all the code, documentation, and resources needed to understand, contribute to, or deploy the BlueCarbonX platform.

📂 Repository Structure

Frontend (React/Vite):
- src/components/ - React components
- src/assets/ - Images and static files
- src/styles/ - CSS and styling files
- public/ - Public assets

Smart Contracts:
- contracts/ - Solidity smart contracts
- scripts/ - Deployment and utility scripts
- test/ - Contract tests

Backend Services:
- api/ - REST API endpoints
- services/ - Business logic services
- database/ - Database schemas and migrations

Documentation:
- docs/ - Technical documentation
- README.md - Project overview
- CONTRIBUTING.md - Contribution guidelines

🚀 Getting Started

Prerequisites:
• Node.js (v18 or higher)
• npm or yarn package manager
• Git for version control
• MetaMask wallet for testing

Installation:
1. Clone the repository
   git clone https://github.com/bluecarbonx/bluecarbonx.git
   
2. Install dependencies
   npm install
   
3. Set up environment variables
   cp .env.example .env
   
4. Start development server
   npm run dev

🔧 Development Setup

Frontend Development:
• React 19 with Vite for fast development
• React Router for navigation
• Custom CSS for styling
• Responsive design for all devices

Smart Contract Development:
• Solidity for contract development
• Hardhat for testing and deployment
• OpenZeppelin for security standards
• Polygon network for deployment

Testing:
• Jest for unit testing
• React Testing Library for component tests
• Hardhat tests for smart contracts
• End-to-end testing with Playwright

🤝 Contributing

We welcome contributions from the community! Here's how you can help:

Bug Reports:
• Use GitHub Issues to report bugs
• Provide detailed reproduction steps
• Include system information and logs

Feature Requests:
• Submit feature ideas via Issues
• Discuss implementation approach
• Consider impact on existing functionality

Code Contributions:
• Fork the repository
• Create a feature branch
• Follow coding standards
• Submit pull requests with tests

📋 Contribution Guidelines

Code Style:
• Follow ESLint configuration
• Use meaningful variable names
• Add comments for complex logic
• Write tests for new features

Commit Messages:
• Use conventional commit format
• Be descriptive and concise
• Reference issue numbers when applicable

Pull Requests:
• Provide clear description
• Include tests for new features
• Update documentation as needed
• Ensure all checks pass

🔐 Security

Security is paramount in our blockchain application:

Smart Contract Security:
• Regular security audits
• OpenZeppelin standards compliance
• Comprehensive test coverage
• Formal verification where applicable

Frontend Security:
• Input validation and sanitization
• Secure API communication
• Wallet connection security
• XSS and CSRF protection

Reporting Security Issues:
• Use GitHub Security Advisories
• Provide detailed vulnerability information
• Allow reasonable time for fixes
• Coordinate disclosure timeline

📊 Project Status

Current Development:
✅ Core platform functionality
✅ User registration and authentication
✅ Basic MRV workflow
✅ Smart contract deployment

In Progress:
🔄 Advanced verification features
🔄 Marketplace integration
🔄 Mobile app development
🔄 Performance optimizations

Planned Features:
📅 Multi-chain support
📅 Advanced analytics
📅 API rate limiting
📅 Enhanced security features

📞 Community & Support

Join our community:
• GitHub Discussions for questions
• Discord server for real-time chat
• Twitter for project updates
• Email for direct support

Resources:
• Documentation website
• Video tutorials
• Developer guides
• API reference

🎯 Roadmap

Q1 2024:
• Complete core platform features
• Launch mainnet deployment
• Community beta testing

Q2 2024:
• Advanced verification tools
• Mobile application release
• Partnership integrations

Q3 2024:
• Multi-chain expansion
• Advanced analytics dashboard
• Enterprise features

Q4 2024:
• Global marketplace launch
• Carbon credit trading
• Sustainability reporting tools`

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />
      }
      
      // Handle main headers (lines starting with 🐙, 🔗, etc.)
      if (line.match(/^[🐙🔗📂🚀🔧🤝📋🔐📊📞🎯]/)) {
        return (
          <h2 key={index} className="github-header">
            {line}
          </h2>
        )
      }
      
      // Handle sub-headers (lines ending with :)
      if (line.endsWith(':') && !line.startsWith('🐙')) {
        return (
          <h3 key={index} className="github-subheader">
            {line}
          </h3>
        )
      }
      
      // Handle numbered lists
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="github-numbered">
            {line}
          </li>
        )
      }
      
      // Handle bullet points
      if (line.startsWith('•')) {
        return (
          <li key={index} className="github-bullet">
            {line.substring(1).trim()}
          </li>
        )
      }
      
      // Handle status indicators
      if (line.startsWith('✅') || line.startsWith('🔄') || line.startsWith('📅')) {
        return (
          <li key={index} className="github-status">
            {line}
          </li>
        )
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="github-paragraph">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="github-container">
      <div className="github-wrapper">
        <div className="github-header-section">
          <h1>GitHub Repository</h1>
          <p>Open-source development and community contributions</p>
        </div>
        
        <div className="github-content">
          {formatContent(githubContent)}
        </div>
        
        <div className="github-actions">
          <a 
            href="https://github.com/bluecarbonx/bluecarbonx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            View on GitHub →
          </a>
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

export default GitHub
