import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Log contact form data
      console.log('Contact Form Submission:', {
        ...formData,
        submittedAt: new Date().toISOString()
      })
      
      alert('Thank you for your message! We will get back to you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: ''
      })
      
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = `📞 Contact BlueCarbonX

🌍 Get in Touch

We're here to help! Whether you're a producer looking to register projects, a verifier wanting to join our network, or a buyer interested in carbon credits, our team is ready to assist you.

📧 Contact Information

General Inquiries:
• Email: info@bluecarbonx.com
• Phone: +1 (555) 123-4567
• Response time: 24-48 hours

Technical Support:
• Email: support@bluecarbonx.com
• Documentation: docs.bluecarbonx.com
• Response time: 12-24 hours

Business Partnerships:
• Email: partnerships@bluecarbonx.com
• Phone: +1 (555) 123-4568
• Response time: 48-72 hours

Media & Press:
• Email: press@bluecarbonx.com
• Press kit available upon request

🏢 Office Locations

Headquarters:
BlueCarbonX Inc.
123 Blockchain Street
San Francisco, CA 94105
United States

European Office:
BlueCarbonX Europe
456 Carbon Lane
London, UK SW1A 1AA
United Kingdom

Asia-Pacific Office:
BlueCarbonX Asia
789 Green Building
Singapore 018956
Singapore

⏰ Business Hours

Monday - Friday: 9:00 AM - 6:00 PM (PST)
Saturday: 10:00 AM - 2:00 PM (PST)
Sunday: Closed

Emergency Support:
Available 24/7 for critical platform issues

🌐 Social Media

Follow us for updates:
• Twitter: @BlueCarbonX
• LinkedIn: BlueCarbonX
• Discord: BlueCarbonX Community
• YouTube: BlueCarbonX Channel

📋 Frequently Asked Questions

General Questions:
• How does BlueCarbonX work?
• What are blue carbon credits?
• How do I get started?

Technical Questions:
• How to connect my wallet?
• What blockchain does BlueCarbonX use?
• How secure is the platform?

Business Questions:
• How to become a verifier?
• What are the fees?
• How to list carbon credits?

🔗 Quick Links

• Documentation: docs.bluecarbonx.com
• GitHub: github.com/bluecarbonx
• Whitepaper: bluecarbonx.com/whitepaper
• Blog: blog.bluecarbonx.com`

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />
      }
      
      // Handle main headers (lines starting with 📞, 🌍, etc.)
      if (line.match(/^[📞🌍📧🏢⏰🌐📋🔗]/)) {
        return (
          <h2 key={index} className="contact-header">
            {line}
          </h2>
        )
      }
      
      // Handle sub-headers (lines ending with :)
      if (line.endsWith(':') && !line.startsWith('📞')) {
        return (
          <h3 key={index} className="contact-subheader">
            {line}
          </h3>
        )
      }
      
      // Handle bullet points
      if (line.startsWith('•')) {
        return (
          <li key={index} className="contact-bullet">
            {line.substring(1).trim()}
          </li>
        )
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="contact-paragraph">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-header-section">
          <h1>Contact Us</h1>
          <p>Get in touch with the BlueCarbonX team</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            {formatContent(contactInfo)}
          </div>
          
          <div className="contact-form-section">
            <h2>📝 Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Inquiry Type *</label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className={`form-input ${errors.inquiryType ? 'error' : ''}`}
                >
                  <option value="">Select inquiry type</option>
                  <option value="general">General Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="business">Business Partnership</option>
                  <option value="media">Media & Press</option>
                  <option value="other">Other</option>
                </select>
                {errors.inquiryType && <p className="error-message">{errors.inquiryType}</p>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`form-input ${errors.subject ? 'error' : ''}`}
                  placeholder="Brief subject of your message"
                />
                {errors.subject && <p className="error-message">{errors.subject}</p>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Please provide details about your inquiry..."
                  rows="5"
                />
                {errors.message && <p className="error-message">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="contact-back">
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

export default Contact
