import React from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, onPageChange }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-brand">
          <h1>Verifier</h1>
        </div>
        <div className="sidebar-links">
          <button 
            className={`sidebar-link ${currentPage === 'review' ? 'active' : ''}`}
            onClick={() => onPageChange('review')}
          >
            Document Review
          </button>
          <button 
            className={`sidebar-link ${currentPage === 'tracker' ? 'active' : ''}`}
            onClick={() => onPageChange('tracker')}
          >
            Status Tracker
          </button>
          <button 
            className={`sidebar-link ${currentPage === 'projects' ? 'active' : ''}`}
            onClick={() => onPageChange('projects')}
          >
            Projects
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

