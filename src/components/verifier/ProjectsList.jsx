import React, { useState } from 'react';
import './ProjectsList.css';

const ProjectsList = () => {
  const [projects] = useState([
    {
      id: 'PROJ-001',
      name: 'Amazon Rainforest Reforestation',
      description: 'Large-scale reforestation project in the Amazon basin to restore degraded lands and sequester carbon',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'John Smith',
      startDate: '2024-01-10',
      dueDate: '2024-03-15',
      progress: 65,
      team: ['John Smith', 'Sarah Johnson', 'Mike Chen'],
      category: 'reforestation',
      carbonCredits: 2500
    },
    {
      id: 'PROJ-002',
      name: 'Urban Tree Planting Initiative',
      description: 'Planting 10,000 trees across major cities to improve air quality and create urban carbon sinks',
      status: 'planning',
      priority: 'medium',
      assignedTo: 'Sarah Johnson',
      startDate: '2024-02-01',
      dueDate: '2024-05-30',
      progress: 15,
      team: ['Sarah Johnson', 'Alex Rodriguez', 'Emma Wilson'],
      category: 'urban-forestry',
      carbonCredits: 800
    },
    {
      id: 'PROJ-003',
      name: 'Mangrove Restoration Project',
      description: 'Restore coastal mangrove ecosystems to protect shorelines and capture blue carbon',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Mike Chen',
      startDate: '2023-12-01',
      dueDate: '2024-01-31',
      progress: 100,
      team: ['Mike Chen', 'David Lee'],
      category: 'mangrove-restoration',
      carbonCredits: 1800
    },
    {
      id: 'PROJ-004',
      name: 'Forest Fire Prevention System',
      description: 'Implement advanced monitoring and early warning systems to prevent forest fires',
      status: 'review',
      priority: 'critical',
      assignedTo: 'Alex Rodriguez',
      startDate: '2024-01-15',
      dueDate: '2024-02-28',
      progress: 80,
      team: ['Alex Rodriguez', 'Security Team'],
      category: 'forest-protection',
      carbonCredits: 3200
    },
    {
      id: 'PROJ-005',
      name: 'Agroforestry Implementation',
      description: 'Integrate trees into agricultural systems to improve soil health and carbon sequestration',
      status: 'in-progress',
      priority: 'low',
      assignedTo: 'Emma Wilson',
      startDate: '2024-01-20',
      dueDate: '2024-03-10',
      progress: 40,
      team: ['Emma Wilson', 'John Smith'],
      category: 'agroforestry',
      carbonCredits: 1200
    },
    {
      id: 'PROJ-006',
      name: 'Bamboo Forest Development',
      description: 'Establish sustainable bamboo plantations for carbon capture and renewable materials',
      status: 'planning',
      priority: 'medium',
      assignedTo: 'David Lee',
      startDate: '2024-02-15',
      dueDate: '2024-04-15',
      progress: 5,
      team: ['David Lee', 'Mike Chen', 'Sarah Johnson'],
      category: 'bamboo-forestry',
      carbonCredits: 1500
    },
    {
      id: 'PROJ-007',
      name: 'Community Tree Nursery Program',
      description: 'Establish local tree nurseries to support community-led reforestation efforts',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'Emma Wilson',
      startDate: '2023-11-01',
      dueDate: '2023-12-31',
      progress: 100,
      team: ['Emma Wilson', 'Training Team'],
      category: 'community-forestry',
      carbonCredits: 600
    },
    {
      id: 'PROJ-008',
      name: 'Carbon Credit Verification System',
      description: 'Develop blockchain-based system for transparent carbon credit tracking and verification',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Mike Chen',
      startDate: '2024-01-05',
      dueDate: '2024-02-29',
      progress: 75,
      team: ['Mike Chen', 'Infrastructure Team'],
      category: 'carbon-trading',
      carbonCredits: 0
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { text: 'Completed', icon: '✓', className: 'status-completed', color: '#4CAF50' };
      case 'in-progress':
        return { text: 'In Progress', icon: '⚡', className: 'status-in-progress', color: '#2196F3' };
      case 'planning':
        return { text: 'Planning', icon: '📋', className: 'status-planning', color: '#FF9800' };
      case 'review':
        return { text: 'Under Review', icon: '👀', className: 'status-review', color: '#9C27B0' };
      default:
        return { text: 'Unknown', icon: '❓', className: 'status-unknown', color: '#9E9E9E' };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'critical':
        return { text: 'Critical', className: 'priority-critical', color: '#f44336' };
      case 'high':
        return { text: 'High', className: 'priority-high', color: '#FF5722' };
      case 'medium':
        return { text: 'Medium', className: 'priority-medium', color: '#FF9800' };
      case 'low':
        return { text: 'Low', className: 'priority-low', color: '#4CAF50' };
      default:
        return { text: 'Unknown', className: 'priority-unknown', color: '#9E9E9E' };
    }
  };

  const filteredProjects = projects.filter(project => {
    const tabMatch = selectedTab === 'all' || 
      (selectedTab === 'my-projects' && project.assignedTo === 'John Smith') ||
      (selectedTab === 'team-projects' && project.team.includes('John Smith'));
    
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || project.priority === selectedPriority;
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;

    return tabMatch && categoryMatch && priorityMatch && statusMatch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'dueDate':
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
        break;
      case 'progress':
        aValue = a.progress;
        bValue = b.progress;
        break;
      case 'priority':
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority] || 0;
        bValue = priorityOrder[b.priority] || 0;
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const downloadCertificate = (project) => {
    // Create a new window for the certificate
    const certificateWindow = window.open('', '_blank', 'width=800,height=1000');
    
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Project Completion Certificate - ${project.name}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .certificate {
            background: white;
            border: 8px solid #2c5530;
            border-radius: 20px;
            padding: 60px;
            max-width: 700px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            position: relative;
          }
          .certificate::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 2px solid #4CAF50;
            border-radius: 10px;
            pointer-events: none;
          }
          .header {
            color: #2c5530;
            margin-bottom: 30px;
          }
          .header h1 {
            font-size: 2.5em;
            margin: 0;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 3px;
          }
          .header p {
            font-size: 1.2em;
            margin: 10px 0;
            color: #666;
          }
          .project-info {
            margin: 40px 0;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 15px;
            border-left: 5px solid #4CAF50;
          }
          .project-name {
            font-size: 1.8em;
            color: #2c5530;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .project-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
            text-align: left;
          }
          .detail-item {
            padding: 10px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
          }
          .detail-label {
            font-weight: bold;
            color: #2c5530;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .detail-value {
            color: #333;
            font-size: 1.1em;
            margin-top: 5px;
          }
          .carbon-credits {
            background: linear-gradient(135deg, #4CAF50, #8BC34A);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin: 30px 0;
          }
          .carbon-credits h3 {
            margin: 0 0 10px 0;
            font-size: 1.5em;
          }
          .carbon-credits .amount {
            font-size: 2.5em;
            font-weight: bold;
            margin: 0;
          }
          .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid #e0e0e0;
          }
          .signature {
            text-align: center;
            width: 200px;
          }
          .signature-line {
            border-bottom: 2px solid #2c5530;
            margin-bottom: 10px;
            height: 40px;
          }
          .signature-label {
            color: #666;
            font-size: 0.9em;
          }
          .date {
            color: #666;
            margin-top: 30px;
            font-size: 1.1em;
          }
          .logo {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 2em;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          
          <div class="header">
            <h1>Certificate of Completion</h1>
            <p>Carbon Credit Project Verification</p>
          </div>
          
          <div class="project-info">
            <div class="project-name">${project.name}</div>
            <p style="color: #666; font-size: 1.1em; margin: 0;">${project.description}</p>
          </div>

          <div class="project-details">
            <div class="detail-item">
              <div class="detail-label">Project ID</div>
              <div class="detail-value">${project.id}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Project Manager</div>
              <div class="detail-value">${project.assignedTo}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Completion Date</div>
              <div class="detail-value">${formatDate(project.dueDate)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Category</div>
              <div class="detail-value">${project.category.replace('-', ' ').toUpperCase()}</div>
            </div>
          </div>

          <div class="carbon-credits">
            <h3>Carbon Credits Generated</h3>
            <p class="amount">${project.carbonCredits.toLocaleString()}</p>
            <p style="margin: 0; font-size: 1.2em;">Tons of CO₂ Sequestered</p>
          </div>

          <div class="signatures">
            <div class="signature">
              <div class="signature-line"></div>
              <div class="signature-label">Project Manager</div>
            </div>
            <div class="signature">
              <div class="signature-line"></div>
              <div class="signature-label">Verification Officer</div>
            </div>
          </div>

          <div class="date">
            <strong>Certificate Issued:</strong> ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </body>
      </html>
    `;

    certificateWindow.document.write(certificateHTML);
    certificateWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
      certificateWindow.print();
    }, 1000);
  };

  return (
    <div className="projects-list">
      <div className="projects-header">
        <h2>Assigned Projects</h2>
        <p>Manage and track all your assigned projects</p>
      </div>

      <div className="projects-controls">
        <div className="tabs">
          <button 
            className={`tab ${selectedTab === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedTab('all')}
          >
            All Projects
          </button>
          <button 
            className={`tab ${selectedTab === 'my-projects' ? 'active' : ''}`}
            onClick={() => setSelectedTab('my-projects')}
          >
            My Projects
          </button>
          <button 
            className={`tab ${selectedTab === 'team-projects' ? 'active' : ''}`}
            onClick={() => setSelectedTab('team-projects')}
          >
            Team Projects
          </button>
        </div>

        <div className="filters">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="reforestation">Reforestation</option>
            <option value="urban-forestry">Urban Forestry</option>
            <option value="mangrove-restoration">Mangrove Restoration</option>
            <option value="forest-protection">Forest Protection</option>
            <option value="agroforestry">Agroforestry</option>
            <option value="bamboo-forestry">Bamboo Forestry</option>
            <option value="community-forestry">Community Forestry</option>
            <option value="carbon-trading">Carbon Trading</option>
          </select>

          <select 
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Under Review</option>
            <option value="completed">Completed</option>
          </select>

          <select 
            value={`${sortBy}-${sortOrder}`} 
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="filter-select"
          >
            <option value="dueDate-asc">Due Date (Earliest)</option>
            <option value="dueDate-desc">Due Date (Latest)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="progress-desc">Progress (High to Low)</option>
            <option value="progress-asc">Progress (Low to High)</option>
            <option value="priority-desc">Priority (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="projects-stats">
        <div className="stat-card">
          <div className="stat-number">{filteredProjects.length}</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredProjects.filter(p => p.status === 'in-progress').length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredProjects.filter(p => p.status === 'completed').length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredProjects.filter(p => getDaysUntilDue(p.dueDate) < 7 && p.status !== 'completed').length}</div>
          <div className="stat-label">Due Soon</div>
        </div>
      </div>

      <div className="projects-grid">
        {sortedProjects.map((project) => {
          const statusInfo = getStatusInfo(project.status);
          const priorityInfo = getPriorityInfo(project.priority);
          const daysUntilDue = getDaysUntilDue(project.dueDate);
          
          return (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-title">
                  <h3>{project.name}</h3>
                  <span className="project-id">{project.id}</span>
                </div>
                <div className="project-badges">
                  <span className={`status-badge ${statusInfo.className}`}>
                    <span className="status-icon">{statusInfo.icon}</span>
                    {statusInfo.text}
                  </span>
                  <span className={`priority-badge ${priorityInfo.className}`}>
                    {priorityInfo.text}
                  </span>
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-progress">
                <div className="progress-header">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="project-details">
                <div className="detail-row">
                  <span className="detail-label">Assigned to:</span>
                  <span className="detail-value">{project.assignedTo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Team:</span>
                  <span className="detail-value">{project.team.join(', ')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Start Date:</span>
                  <span className="detail-value">{formatDate(project.startDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Due Date:</span>
                  <span className={`detail-value ${daysUntilDue < 7 && project.status !== 'completed' ? 'due-soon' : ''}`}>
                    {formatDate(project.dueDate)}
                    {daysUntilDue < 7 && project.status !== 'completed' && (
                      <span className="due-warning"> ({daysUntilDue} days left)</span>
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value category-badge">{project.category}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Carbon Credits:</span>
                  <span className="detail-value carbon-credits">{project.carbonCredits.toLocaleString()} tons CO₂</span>
                </div>
              </div>

              {project.status === 'completed' && (
                <div className="certificate-section">
                  <button 
                    className="download-certificate-btn"
                    onClick={() => downloadCertificate(project)}
                  >
                    📜 Download Certificate
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {sortedProjects.length === 0 && (
        <div className="no-projects">
          <div className="no-projects-icon">📋</div>
          <h3>No projects found</h3>
          <p>Try adjusting your filters to see more projects.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;

