import React, { useState } from 'react';
import Navigation from './verifier/Navigation';
import ActionButtons from './verifier/ActionButtons';
import StatusDisplay from './verifier/StatusDisplay';
import StatusTracker from './verifier/StatusTracker';
import ProjectsList from './verifier/ProjectsList';
import './verifier/VerifierApp.css';

function App() {
  const [currentPage, setCurrentPage] = useState('review');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 'DOC-2024-001',
      title: 'Forest Restoration Project',
      type: 'Environmental',
      priority: 'High',
      status: 'pending',
      scope: '500 hectares forest restoration',
      duration: '3 years (2024-2027)',
      co2Impact: '15,000 tons sequestered',
      location: 'Amazon Rainforest, Brazil',
      submittedDate: new Date().toLocaleDateString(),
      description: 'This comprehensive forest restoration project aims to rehabilitate 500 hectares of degraded land through sustainable reforestation practices.',
      detailedDescription: 'This comprehensive forest restoration project aims to rehabilitate 500 hectares of degraded land through sustainable reforestation practices. The project includes detailed environmental impact assessments, community engagement plans, and long-term monitoring protocols. The initiative focuses on native species restoration, soil rehabilitation, and biodiversity conservation. It involves collaboration with local communities, scientific institutions, and environmental organizations to ensure sustainable outcomes and long-term ecological benefits.',
      clarificationText: ''
    },
    {
      id: 'DOC-2024-002',
      title: 'Solar Energy Initiative',
      type: 'Renewable Energy',
      priority: 'Medium',
      status: 'pending',
      scope: '50MW solar farm installation',
      duration: '2 years (2024-2026)',
      co2Impact: '25,000 tons CO₂ reduction',
      location: 'Sahara Desert, Morocco',
      submittedDate: new Date(Date.now() - 86400000).toLocaleDateString(),
      description: 'Large-scale solar energy project to establish a 50MW solar farm in the Sahara Desert.',
      detailedDescription: 'Large-scale solar energy project to establish a 50MW solar farm in the Sahara Desert, providing clean energy to local communities and reducing carbon emissions significantly. The project utilizes cutting-edge photovoltaic technology and includes energy storage systems, grid integration infrastructure, and community education programs. It aims to provide sustainable energy solutions while creating local employment opportunities and supporting regional economic development.',
      clarificationText: ''
    },
    {
      id: 'DOC-2024-003',
      title: 'Ocean Cleanup Program',
      type: 'Marine Conservation',
      priority: 'High',
      status: 'pending',
      scope: '100km coastline cleanup',
      duration: '4 years (2024-2028)',
      co2Impact: '5,000 tons plastic removed',
      location: 'Pacific Ocean, California',
      submittedDate: new Date(Date.now() - 172800000).toLocaleDateString(),
      description: 'Comprehensive ocean cleanup initiative targeting plastic waste in the Pacific Ocean.',
      detailedDescription: 'Comprehensive ocean cleanup initiative targeting plastic waste in the Pacific Ocean, with advanced filtration systems and community engagement programs. The project employs autonomous cleanup vessels, AI-powered waste detection systems, and innovative recycling technologies. It includes extensive marine research, species protection measures, and educational outreach to prevent future pollution. The initiative collaborates with international organizations and local communities to create sustainable solutions for ocean conservation.',
      clarificationText: ''
    },
    {
      id: 'DOC-2024-004',
      title: 'Urban Green Spaces',
      type: 'Urban Planning',
      priority: 'Low',
      status: 'pending',
      scope: '20 urban parks creation',
      duration: '1.5 years (2024-2025)',
      co2Impact: '2,000 tons CO₂ absorbed',
      location: 'New York City, USA',
      submittedDate: new Date(Date.now() - 259200000).toLocaleDateString(),
      description: 'Development of 20 new urban green spaces across New York City.',
      detailedDescription: 'Development of 20 new urban green spaces across New York City to improve air quality, provide recreational areas, and enhance urban biodiversity. The project includes rooftop gardens, vertical green walls, community gardens, and pocket parks in underserved neighborhoods. It incorporates native plant species, sustainable irrigation systems, and educational programs for residents. The initiative aims to create a network of interconnected green spaces that improve mental health, reduce urban heat island effects, and provide habitat for local wildlife.',
      clarificationText: ''
    }
  ]);

  const handleProjectAction = (projectId, action, data = '') => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              status: action,
              clarificationText: action === 'clarification' ? data : project.clarificationText
            }
          : project
      )
    );
  };

  const removeProject = (projectId) => {
    setProjects(prevProjects => 
      prevProjects.filter(project => project.id !== projectId)
    );
  };

  const handleAction = (projectId, action, data = '') => {
    if (action === 'approved' || action === 'rejected') {
      // Remove project after approval or rejection
      setTimeout(() => {
        removeProject(projectId);
      }, 2000); // 2 second delay to show status
    }
    handleProjectAction(projectId, action, data);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'tracker':
        return <StatusTracker />;
      case 'projects':
        return <ProjectsList />;
      case 'review':
      default:
        return (
          <div>
            <div className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title" style={{fontSize: '2em'}}>Project Verification</h1>
              </div>
            </div>

            <div className="review-dashboard">
              <div className="review-header">
                <h2>Document Review Dashboard</h2>
                <p>Review pending projects and take appropriate action. Projects will be removed from the list once approved or rejected.</p>
              </div>

              {projects.length === 0 ? (
                <div className="no-projects">
                  <div className="no-projects-icon">✅</div>
                  <h3>All Caught Up!</h3>
                  <p>No pending projects to review at this time.</p>
                </div>
              ) : (
                <div className="projects-grid">
                  {projects.map((project) => (
                    <div key={project.id} className="project-review-card" onClick={() => setSelectedProject(project)}>
                      <div className="project-header">
                        <div className="project-title-section">
                          <h3>{project.title}</h3>
                          <div className="project-badges">
                            <span className={`project-type ${project.type.toLowerCase().replace(' ', '-')}`}>
                              {project.type}
                            </span>
                            <span className={`priority-level ${project.priority.toLowerCase()}`}>
                              {project.priority} Priority
                            </span>
                          </div>
                        </div>
                        <div className="project-status">
                          <span className={`status-indicator ${project.status}`}>
                            {project.status === 'pending' ? 'Pending' : 
                             project.status === 'approved' ? 'Approved' :
                             project.status === 'rejected' ? 'Rejected' : 'Clarification Requested'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="project-content">
                        <div className="project-overview">
                          <p>{project.description}</p>
                          
                          {/* Action buttons inside description - removed for cleaner cards */}
                        </div>
                        
                        <div className="project-details">
                          <div className="detail-grid">
                            <div className="detail-item">
                              <span className="detail-label">Scope:</span>
                              <span className="detail-value">{project.scope}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Duration:</span>
                              <span className="detail-value">{project.duration}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">CO₂ Impact:</span>
                              <span className="detail-value">{project.co2Impact}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Location:</span>
                              <span className="detail-value">{project.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="project-meta">
                        <div className="meta-item">
                          <span className="meta-label">Document ID:</span>
                          <span className="meta-value">{project.id}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Submitted:</span>
                          <span className="meta-value">{project.submittedDate}</span>
                        </div>
                      </div>

                      <StatusDisplay status={project.status} clarificationText={project.clarificationText} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detailed Project Modal */}
            {selectedProject && (
              <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{selectedProject.title}</h3>
                    <button 
                      className="close-btn"
                      onClick={() => setSelectedProject(null)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="project-detail-header">
                      <div className="project-detail-badges">
                        <span className={`project-type ${selectedProject.type.toLowerCase().replace(' ', '-')}`}>
                          {selectedProject.type}
                        </span>
                        <span className={`priority-level ${selectedProject.priority.toLowerCase()}`}>
                          {selectedProject.priority} Priority
                        </span>
                        <span className={`status-indicator ${selectedProject.status}`}>
                          {selectedProject.status === 'pending' ? 'Pending' : 
                           selectedProject.status === 'approved' ? 'Approved' :
                           selectedProject.status === 'rejected' ? 'Rejected' : 'Clarification Requested'}
                        </span>
                      </div>
                    </div>

                    <div className="project-detail-content">
                      <div className="project-detail-description">
                        <h4>Project Description</h4>
                        <p>{selectedProject.detailedDescription}</p>
                      </div>
                      
                      <div className="project-detail-info">
                        <div className="detail-grid">
                          <div className="detail-item">
                            <span className="detail-label">Project Scope:</span>
                            <span className="detail-value">{selectedProject.scope}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Duration:</span>
                            <span className="detail-value">{selectedProject.duration}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">CO₂ Impact:</span>
                            <span className="detail-value">{selectedProject.co2Impact}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Location:</span>
                            <span className="detail-value">{selectedProject.location}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Document ID:</span>
                            <span className="detail-value">{selectedProject.id}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Submitted:</span>
                            <span className="detail-value">{selectedProject.submittedDate}</span>
                          </div>
                        </div>
                      </div>

                      <StatusDisplay status={selectedProject.status} clarificationText={selectedProject.clarificationText} />
                      
                      <ActionButtons 
                        onAction={(action, data) => handleAction(selectedProject.id, action, data)}
                        currentStatus={selectedProject.status}
                        onReset={() => handleProjectAction(selectedProject.id, 'pending', '')}
                        hideApprove={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="App-main">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;

<div className="hero-section">
  <div className="hero-content">
    <h1 className="hero-title">Project Verification</h1>
    <p className="hero-subtitle">
      A streamlined dashboard to review, approve, or request clarification on carbon credit projects.
    </p>
    <button className="hero-button">Get Started</button>
  </div>
</div>
