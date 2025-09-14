import React, { useState } from 'react';
import './StatusTracker.css';

const StatusTracker = () => {
  const [documents] = useState([
    {
      id: 'DOC-2024-001',
      title: 'Project Proposal Document',
      status: 'pending',
      submittedDate: '2024-01-15',
      lastUpdated: '2024-01-15',
      statusHistory: [
        { status: 'pending', timestamp: '2024-01-15T10:00:00', note: 'Document submitted for review' }
      ]
    },
    {
      id: 'DOC-2024-002',
      title: 'Budget Approval Request',
      status: 'approved',
      submittedDate: '2024-01-14',
      lastUpdated: '2024-01-16',
      statusHistory: [
        { status: 'pending', timestamp: '2024-01-14T14:30:00', note: 'Document submitted for review' },
        { status: 'approved', timestamp: '2024-01-16T09:15:00', note: 'Approved by Finance Manager' }
      ]
    },
    {
      id: 'DOC-2024-003',
      title: 'Contract Agreement',
      status: 'rejected',
      submittedDate: '2024-01-13',
      lastUpdated: '2024-01-17',
      statusHistory: [
        { status: 'pending', timestamp: '2024-01-13T11:20:00', note: 'Document submitted for review' },
        { status: 'clarification', timestamp: '2024-01-15T16:45:00', note: 'Legal team requested contract terms clarification' },
        { status: 'rejected', timestamp: '2024-01-17T13:30:00', note: 'Rejected due to missing signatures' }
      ]
    },
    {
      id: 'DOC-2024-004',
      title: 'Technical Specification',
      status: 'clarification',
      submittedDate: '2024-01-16',
      lastUpdated: '2024-01-18',
      statusHistory: [
        { status: 'pending', timestamp: '2024-01-16T08:00:00', note: 'Document submitted for review' },
        { status: 'clarification', timestamp: '2024-01-18T10:30:00', note: 'Need additional technical details for section 3.2' }
      ]
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filter, setFilter] = useState('all');

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved':
        return { text: 'Approved', icon: '✓', className: 'status-approved', color: '#4CAF50' };
      case 'rejected':
        return { text: 'Rejected', icon: '✗', className: 'status-rejected', color: '#f44336' };
      case 'clarification':
        return { text: 'Clarification', icon: '?', className: 'status-clarification', color: '#FF9800' };
      default:
        return { text: 'Pending', icon: '⏳', className: 'status-pending', color: '#FFD700' };
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (filter === 'all') return true;
    return doc.status === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusProgress = (history) => {
    const statusOrder = ['pending', 'clarification', 'approved', 'rejected'];
    const currentStatusIndex = statusOrder.indexOf(history[history.length - 1].status);
    return ((currentStatusIndex + 1) / statusOrder.length) * 100;
  };

  return (
    <div className="status-tracker">
      <div className="tracker-header">
        <h2>Document Status Tracker</h2>
        <p>Monitor the progress of document reviews and approvals</p>
      </div>

      <div className="filter-controls">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Documents
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
        <button 
          className={`filter-btn ${filter === 'clarification' ? 'active' : ''}`}
          onClick={() => setFilter('clarification')}
        >
          Clarification
        </button>
      </div>

      <div className="documents-grid">
        {filteredDocuments.map((doc) => {
          const statusInfo = getStatusInfo(doc.status);
          const progress = getStatusProgress(doc.statusHistory);
          
          return (
            <div 
              key={doc.id} 
              className={`document-card ${statusInfo.className}`}
              onClick={() => setSelectedDocument(doc)}
            >
              <div className="document-header">
                <h3>{doc.title}</h3>
                <span className="document-id">{doc.id}</span>
              </div>
              
              <div className="status-badge">
                <span className="status-icon">{statusInfo.icon}</span>
                <span className="status-text">{statusInfo.text}</span>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: statusInfo.color 
                  }}
                ></div>
              </div>
              
              <div className="document-meta">
                <span>Submitted: {formatDate(doc.submittedDate)}</span>
                <span>Updated: {formatDate(doc.lastUpdated)}</span>
              </div>
              
              <div className="status-count">
                {doc.statusHistory.length} status change{doc.statusHistory.length !== 1 ? 's' : ''}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDocument && (
        <div className="modal-overlay" onClick={() => setSelectedDocument(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedDocument.title}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedDocument(null)}
              >
                ×
              </button>
            </div>
            
            <div className="status-timeline">
              <h4>Status History</h4>
              {selectedDocument.statusHistory.map((entry, index) => {
                const statusInfo = getStatusInfo(entry.status);
                return (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker" style={{ backgroundColor: statusInfo.color }}>
                      <span className="timeline-icon">{statusInfo.icon}</span>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-status">{statusInfo.text}</div>
                      <div className="timeline-date">{formatDate(entry.timestamp)}</div>
                      <div className="timeline-note">{entry.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusTracker;

