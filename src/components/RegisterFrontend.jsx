import React, { useState } from 'react'
import './RegisterFrontend.css'

const RegisterFrontend = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    walletAddress: '',
    role: '',
    
    // Role-specific fields
    organizationName: '',
    projectName: '',
    projectType: '',
    location: '',
    documents: null,
    accreditationNumber: '',
    certification: null,
    companyIndividual: '',
    purposeOfBuying: '',
    country: '',
    accessCode: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const validateStep1 = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.walletAddress.trim()) {
      newErrors.walletAddress = 'Wallet address is required'
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select a role'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    if (formData.role === 'Producer') {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Organization/Project Name is required'
      }
      if (!formData.projectType.trim()) {
        newErrors.projectType = 'Project Type is required'
      }
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required'
      }
    } else if (formData.role === 'Verifier') {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Organization Name is required'
      }
      if (!formData.accreditationNumber.trim()) {
        newErrors.accreditationNumber = 'Accreditation Number is required'
      }
    } else if (formData.role === 'Buyer') {
      if (!formData.companyIndividual.trim()) {
        newErrors.companyIndividual = 'Company/Individual is required'
      }
      if (!formData.purposeOfBuying.trim()) {
        newErrors.purposeOfBuying = 'Purpose of Buying is required'
      }
      if (!formData.country.trim()) {
        newErrors.country = 'Country is required'
      }
    } else if (formData.role === 'Admin') {
      if (!formData.accessCode.trim()) {
        newErrors.accessCode = 'Access Code is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Log collected data to console
      console.log('Registration Data:', {
        ...formData,
        submittedAt: new Date().toISOString()
      })
      
      alert('Registration successful! Check console for submitted data.')
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        walletAddress: '',
        role: '',
        organizationName: '',
        projectName: '',
        projectType: '',
        location: '',
        documents: null,
        accreditationNumber: '',
        certification: null,
        companyIndividual: '',
        purposeOfBuying: '',
        country: '',
        accessCode: ''
      })
      setCurrentStep(1)
      setErrors({})
      
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="register-step">
      <div className="step-header">
        <h2>Basic Information</h2>
        <p>Please provide your basic details to get started</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your mobile number (optional)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Role *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={`form-input ${errors.role ? 'error' : ''}`}
          >
            <option value="">Select your role</option>
            <option value="Producer">Producer</option>
            <option value="Verifier">Verifier</option>
            <option value="Buyer">Buyer</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.role && <p className="error-message">{errors.role}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Create a password (min 8 characters)"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Confirm Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Wallet Address *
        </label>
        <input
          type="text"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleInputChange}
          className={`form-input ${errors.walletAddress ? 'error' : ''}`}
          placeholder="Enter your MetaMask/WalletConnect address"
        />
        {errors.walletAddress && <p className="error-message">{errors.walletAddress}</p>}
        <p className="form-hint">
          Connect your MetaMask wallet to automatically fill this field
        </p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="register-step">
      <div className="step-header">
        <h2>Role-Specific Information</h2>
        <p>Please provide additional details for your selected role: <span className="role-highlight">{formData.role}</span></p>
      </div>

      {formData.role === 'Producer' && (
        <div className="role-section">
          <div className="form-group">
            <label className="form-label">
              Organization/Project Name *
            </label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className={`form-input ${errors.organizationName ? 'error' : ''}`}
              placeholder="Enter your organization or project name"
            />
            {errors.organizationName && <p className="error-message">{errors.organizationName}</p>}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Project Type *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className={`form-input ${errors.projectType ? 'error' : ''}`}
              >
                <option value="">Select project type</option>
                <option value="Mangrove Restoration">Mangrove Restoration</option>
                <option value="Seagrass Conservation">Seagrass Conservation</option>
                <option value="Salt Marsh Protection">Salt Marsh Protection</option>
                <option value="Blue Carbon Monitoring">Blue Carbon Monitoring</option>
                <option value="Other">Other</option>
              </select>
              {errors.projectType && <p className="error-message">{errors.projectType}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`form-input ${errors.location ? 'error' : ''}`}
                placeholder="Enter project location"
              />
              {errors.location && <p className="error-message">{errors.location}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Upload Documents
            </label>
            <input
              type="file"
              name="documents"
              onChange={handleInputChange}
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="form-input"
            />
            <p className="form-hint">
              Upload project documentation, permits, and MRV data (PDF, DOC, images)
            </p>
          </div>
        </div>
      )}

      {formData.role === 'Verifier' && (
        <div className="role-section">
          <div className="form-group">
            <label className="form-label">
              Organization Name *
            </label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className={`form-input ${errors.organizationName ? 'error' : ''}`}
              placeholder="Enter your verification organization name"
            />
            {errors.organizationName && <p className="error-message">{errors.organizationName}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Accreditation Number *
            </label>
            <input
              type="text"
              name="accreditationNumber"
              value={formData.accreditationNumber}
              onChange={handleInputChange}
              className={`form-input ${errors.accreditationNumber ? 'error' : ''}`}
              placeholder="Enter your accreditation number"
            />
            {errors.accreditationNumber && <p className="error-message">{errors.accreditationNumber}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Upload Certification
            </label>
            <input
              type="file"
              name="certification"
              onChange={handleInputChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="form-input"
            />
            <p className="form-hint">
              Upload your verification certification documents
            </p>
          </div>
        </div>
      )}

      {formData.role === 'Buyer' && (
        <div className="role-section">
          <div className="form-group">
            <label className="form-label">
              Company/Individual *
            </label>
            <input
              type="text"
              name="companyIndividual"
              value={formData.companyIndividual}
              onChange={handleInputChange}
              className={`form-input ${errors.companyIndividual ? 'error' : ''}`}
              placeholder="Enter company name or individual name"
            />
            {errors.companyIndividual && <p className="error-message">{errors.companyIndividual}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Purpose of Buying *
            </label>
            <select
              name="purposeOfBuying"
              value={formData.purposeOfBuying}
              onChange={handleInputChange}
              className={`form-input ${errors.purposeOfBuying ? 'error' : ''}`}
            >
              <option value="">Select purpose</option>
              <option value="Carbon Offset">Carbon Offset</option>
              <option value="Corporate Sustainability">Corporate Sustainability</option>
              <option value="ESG Compliance">ESG Compliance</option>
              <option value="Investment">Investment</option>
              <option value="Research">Research</option>
              <option value="Other">Other</option>
            </select>
            {errors.purposeOfBuying && <p className="error-message">{errors.purposeOfBuying}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`form-input ${errors.country ? 'error' : ''}`}
              placeholder="Enter your country"
            />
            {errors.country && <p className="error-message">{errors.country}</p>}
          </div>
        </div>
      )}

      {formData.role === 'Admin' && (
        <div className="role-section">
          <div className="form-group">
            <label className="form-label">
              Access Code *
            </label>
            <input
              type="password"
              name="accessCode"
              value={formData.accessCode}
              onChange={handleInputChange}
              className={`form-input ${errors.accessCode ? 'error' : ''}`}
              placeholder="Enter admin access code"
            />
            {errors.accessCode && <p className="error-message">{errors.accessCode}</p>}
            <p className="form-hint">
              Contact system administrator for access code
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="register-step">
      <div className="step-header">
        <h2>Review & Submit</h2>
        <p>Please review your information before submitting</p>
      </div>

      <div className="summary-card">
        <h3>Registration Summary</h3>
        
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Full Name:</span>
            <p className="summary-value">{formData.fullName}</p>
          </div>
          <div className="summary-item">
            <span className="summary-label">Email:</span>
            <p className="summary-value">{formData.email}</p>
          </div>
          <div className="summary-item">
            <span className="summary-label">Mobile:</span>
            <p className="summary-value">{formData.mobileNumber || 'Not provided'}</p>
          </div>
          <div className="summary-item">
            <span className="summary-label">Role:</span>
            <p className="summary-value">{formData.role}</p>
          </div>
          <div className="summary-item">
            <span className="summary-label">Wallet Address:</span>
            <p className="summary-value wallet-address">{formData.walletAddress}</p>
          </div>
        </div>

        {formData.role === 'Producer' && (
          <div className="role-summary">
            <h4>Producer Details:</h4>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Organization:</span>
                <p className="summary-value">{formData.organizationName}</p>
              </div>
              <div className="summary-item">
                <span className="summary-label">Project Type:</span>
                <p className="summary-value">{formData.projectType}</p>
              </div>
              <div className="summary-item">
                <span className="summary-label">Location:</span>
                <p className="summary-value">{formData.location}</p>
              </div>
            </div>
          </div>
        )}

        {formData.role === 'Verifier' && (
          <div className="role-summary">
            <h4>Verifier Details:</h4>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Organization:</span>
                <p className="summary-value">{formData.organizationName}</p>
              </div>
              <div className="summary-item">
                <span className="summary-label">Accreditation:</span>
                <p className="summary-value">{formData.accreditationNumber}</p>
              </div>
            </div>
          </div>
        )}

        {formData.role === 'Buyer' && (
          <div className="role-summary">
            <h4>Buyer Details:</h4>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Company/Individual:</span>
                <p className="summary-value">{formData.companyIndividual}</p>
              </div>
              <div className="summary-item">
                <span className="summary-label">Purpose:</span>
                <p className="summary-value">{formData.purposeOfBuying}</p>
              </div>
              <div className="summary-item">
                <span className="summary-label">Country:</span>
                <p className="summary-value">{formData.country}</p>
              </div>
            </div>
          </div>
        )}

        {formData.role === 'Admin' && (
          <div className="role-summary">
            <h4>Admin Access:</h4>
            <p className="summary-value">Access code provided</p>
          </div>
        )}
      </div>

      <div className="info-card">
        <div className="info-icon">ℹ️</div>
        <div className="info-content">
          <h3>Ready to Submit</h3>
          <p>By submitting this form, you agree to BlueCarbonX's terms and conditions. Your registration data will be processed securely.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Header */}
        <div className="register-header">
          <h1>Join BlueCarbonX</h1>
          <p>Register to become part of the blue carbon ecosystem</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-container">
          <div className="progress-steps">
            {[1, 2, 3].map((step) => (
              <div key={step} className="progress-step">
                <div className={`step-circle ${currentStep >= step ? 'active' : ''}`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`step-line ${currentStep > step ? 'active' : ''}`} />
                )}
              </div>
            ))}
          </div>
          <div className="step-labels">
            <span className={currentStep >= 1 ? 'active' : ''}>Basic Info</span>
            <span className={currentStep >= 2 ? 'active' : ''}>Role Details</span>
            <span className={currentStep >= 3 ? 'active' : ''}>Submit</span>
          </div>
        </div>

        {/* Form */}
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`nav-button prev-button ${currentStep === 1 ? 'disabled' : ''}`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="nav-button next-button"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`nav-button submit-button ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? 'Submitting...' : 'Submit Registration'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="back-link">
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

export default RegisterFrontend