import React from 'react';
import './StatusDisplay.css';

const StatusDisplay = ({ status, clarificationText }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'approved':
        return {
          text: 'Approved',
          icon: '✓',
          className: 'status-approved',
          message: 'This document has been approved and can proceed to the next stage.'
        };
      case 'rejected':
        return {
          text: 'Rejected',
          icon: '✗',
          className: 'status-rejected',
          message: 'This document has been rejected and requires revision before resubmission.'
        };
      case 'clarification':
        return {
          text: 'Clarification Requested',
          icon: '?',
          className: 'status-clarification',
          message: 'Clarification has been requested for this document.'
        };
      default:
        return {
          text: 'Pending Review',
          icon: '⏳',
          className: 'status-pending',
          message: 'This document is awaiting review and action.'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`status-display ${statusInfo.className}`}>
      <div className="status-header">
        <span className="status-icon">{statusInfo.icon}</span>
        <span className="status-text">{statusInfo.text}</span>
      </div>
      <p className="status-message">{statusInfo.message}</p>
      
      {status === 'clarification' && clarificationText && (
        <div className="clarification-details">
          <h4>Clarification Request:</h4>
          {typeof clarificationText === 'object' ? (
            <div className="clarification-content">
              <div className="clarification-type">
                <strong>Type:</strong> {clarificationText.type?.replace('_', ' ').toUpperCase() || 'General'}
              </div>
              <div className="clarification-text">"{clarificationText.text}"</div>
              {clarificationText.timestamp && (
                <div className="clarification-timestamp">
                  <strong>Requested:</strong> {new Date(clarificationText.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          ) : (
            <p className="clarification-text">"{clarificationText}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusDisplay;

