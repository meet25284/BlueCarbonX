import React, { useState } from 'react';
import './ActionButtons.css';

const ActionButtons = ({ onAction, currentStatus, onReset, hideApprove = false, hideRejectAndClarification = false }) => {
  const [showClarificationInput, setShowClarificationInput] = useState(false);
  const [clarificationText, setClarificationText] = useState('');
  const [clarificationType, setClarificationType] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clarificationTypes = [
    { value: 'general', label: 'General Information' },
    { value: 'technical', label: 'Technical Details' },
    { value: 'financial', label: 'Financial Information' },
    { value: 'legal', label: 'Legal Documentation' },
    { value: 'environmental', label: 'Environmental Impact' }
  ];

  const handleApprove = () => {
    onAction('approved');
  };

  const handleReject = () => {
    onAction('rejected');
  };

  const handleRequestClarification = () => {
    if (showClarificationInput && clarificationText.trim()) {
      setIsSubmitting(true);
      // Simulate API call delay
      setTimeout(() => {
        onAction('clarification', {
          text: clarificationText,
          type: clarificationType,
          timestamp: new Date().toISOString()
        });
        setShowClarificationInput(false);
        setClarificationText('');
        setClarificationType('general');
        setIsSubmitting(false);
      }, 1000);
    } else {
      setShowClarificationInput(true);
    }
  };

  const handleCancelClarification = () => {
    setShowClarificationInput(false);
    setClarificationText('');
    setClarificationType('general');
  };

  const handleReset = () => {
    setShowClarificationInput(false);
    setClarificationText('');
    setClarificationType('general');
    onReset();
  };

  return (
    <div className="action-buttons">
      {currentStatus === 'pending' && (
        <>
          {!hideApprove && (
            <button 
              className="action-btn approve-btn"
              onClick={handleApprove}
            >
              ✓ Approve
            </button>
          )}
          
          {!hideRejectAndClarification && (
            <>
              <button 
                className="action-btn reject-btn"
                onClick={handleReject}
              >
                ✗ Reject
              </button>
              
              <button 
                className="action-btn clarification-btn"
                onClick={handleRequestClarification}
              >
                ? Request Clarification
              </button>
            </>
          )}
        </>
      )}

      {showClarificationInput && (
        <div className="clarification-input">
          <div className="clarification-header">
            <h4>Request Clarification</h4>
            <p>Please provide specific details about what information is needed.</p>
          </div>
          
          <div className="clarification-form">
            <div className="form-group">
              <label htmlFor="clarification-type">Clarification Type:</label>
              <select
                id="clarification-type"
                value={clarificationType}
                onChange={(e) => setClarificationType(e.target.value)}
                className="clarification-select"
              >
                {clarificationTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="clarification-text">Detailed Request:</label>
              <textarea
                id="clarification-text"
                value={clarificationText}
                onChange={(e) => setClarificationText(e.target.value)}
                placeholder="Please provide specific details about what clarification is needed. Be as detailed as possible to help the submitter understand exactly what information you require..."
                rows="4"
                className="clarification-textarea"
                maxLength="500"
              />
              <div className="character-count">
                {clarificationText.length}/500 characters
              </div>
            </div>
          </div>
          
          <div className="clarification-actions">
            <button 
              className="action-btn submit-clarification-btn"
              onClick={handleRequestClarification}
              disabled={!clarificationText.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
            <button 
              className="action-btn cancel-btn"
              onClick={handleCancelClarification}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {currentStatus !== 'pending' && (
        <button 
          className="action-btn reset-btn"
          onClick={handleReset}
        >
          ↻ Reset
        </button>
      )}
    </div>
  );
};

export default ActionButtons;

