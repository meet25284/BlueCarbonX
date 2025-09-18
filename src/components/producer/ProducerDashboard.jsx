import React, { useState } from "react";
import "./ProducerDashboard.css";
export default function ProducerDashboard() {
  const [activeContent, setActiveContent] = useState('Projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  // Static sidebar: keep it open; no resize logic needed
  return (
    <div id="container">
     

      <div id="content">
        {/* Sidebar */}
        <aside id="sidebar-open" role="navigation" aria-label="Producer navigation">
          <div id="sidebar-title">Producer</div>
          <div id="sidebar-bt">
            <button className="bt"
              onClick={() => setActiveContent('Upload MRV')}
              id={activeContent === 'Upload MRV' ? 'active' : undefined}
            >
              Upload MRV
            </button>
            <button className="bt"
              onClick={() => setActiveContent('Projects')}
              id={activeContent === 'Projects' ? 'active' : undefined}
            >
              Projects
            </button>
            <button className="bt"
              onClick={() => setActiveContent('My Credits')}
              id={activeContent === 'My Credits' ? 'active' : undefined}
            >
              My Credits
            </button></div>
        </aside>
        {!isDesktop && isSidebarOpen && <div id="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}

        {/* Main Section */}
        <main id="main">
          <h2>Producer Dashboard</h2>

          {/* Welcome Banner */}
          <div id="welcome-banner">
            <div id="welcome-left">
              <div id="welcome-title">Welcome back, Producer</div>
              <div id="welcome-subtitle">Track projects, upload MRV, and manage your credits in one place.</div>
            </div>
            <div id="welcome-right">
              <button id="btn-primary">Create New Project</button>
            </div>
          </div>

          {/* Quick Stats */}
          <div id="stats">
            <div id="stat-card-projects">
              <div id="stat-label">Active Projects</div>
              <div id="stat-value">3</div>
            </div>
            <div id="stat-card-credits">
              <div id="stat-label">Total Credits</div>
              <div id="stat-value">1,250</div>
            </div>
            <div id="stat-card-pending">
              <div id="stat-label">Pending MRV</div>
              <div id="stat-value">2</div>
            </div>
          </div>
          {activeContent === 'Projects' && (
            <div id="projects">
              <h3>Projects</h3>
              <div id="table-toolbar">
                <input id="search-input" type="text" placeholder="Search projects..." />
                <button id="add-project-btn">Add Project</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Area (ha)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PRJ-001</td>
                    <td>Mangrove Delta</td>
                    <td>125</td>
                    <td><span id="badge-active">Active</span></td>
                  </tr>
                  <tr>
                    <td>PRJ-002</td>
                    <td>Coastal Restoration</td>
                    <td>80</td>
                    <td><span id="badge-pending">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeContent === 'Upload MRV' && (
            <>
              <div id="form-sections">
                {/* Add Project Polygon */}
                <div id="card">
                  <h3>Add Project Polygon</h3>
                  <input
                    type="text"
                    placeholder="Paste GeoJSON polygon or draw on map (placeholder)"
                  />
                  <button id="btn-primary2">Save Polygon</button>
                </div>

                {/* Upload MRV */}
                <div id="card">
                  <h3>Upload MRV</h3>
                  <input type="file" />
                  <input type="text" placeholder="IPFS CID (optional)" />
                  <button id="btn-primary">Submit MRV</button>
                </div>
              </div>
              <div id="helper-text">After submission, MRV goes to verifiers for review. You’ll be notified upon approval.</div>
            </>
          )}

          {activeContent === 'My Credits' && (
            <>
              <div id="credits">
                <p>Total Credits Owned</p>
                <h2>1,250</h2>
              </div>

              <div id="my-credits">
                <h3>My Carbon Credits</h3>
                {/* Table or list of carbon credits */}
                <table>
                  <thead>
                    <tr>
                      <th>Credit ID</th>
                      <th>Project</th>
                      <th>Amount (tCO2e)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CRD-001</td>
                      <td>Mangrove Delta</td>
                      <td>500</td>
                      <td><span id="badge-active">Available</span></td>
                    </tr>
                    <tr>
                      <td>CRD-002</td>
                      <td>Coastal Restoration</td>
                      <td>750</td>
                      <td><span id="badge-pending">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
                <div id="credits-actions">
                  <button id="btn-primary">View Portfolio</button>
                </div>
              </div>

              <div id="activity">
                <h3>Recent Activity</h3>
                <ul>
                  <li>Submitted MRV for PRJ-002 • 2 days ago</li>
                  <li>Updated polygon for PRJ-001 • 1 week ago</li>
                </ul>
              </div>
            </>
          )}
        </main>
      </div>
     
    </div>
  );
}


