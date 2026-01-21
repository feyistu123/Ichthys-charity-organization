import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import CreateProject from "../components/CreateProject";
import Modal from "./Modal";
import EditProject from "../components/EditProject";

const AdminProjects = () => {
  const { projects, deleteProject } = useData();
  const [createProject, setCreateProject] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (projectId) => {
    setDropdownOpen(dropdownOpen === projectId ? null : projectId);
  };

  const toggleDescription = (projectId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const truncateText = (text, limit = 100) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressPercentage = (raised, goal) => {
    return goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;
  };

  return (
    <div className="admin-projects-container">
      <div className="projects-header">
        <h2>Project Management</h2>
        <button className="new-project" onClick={() => setCreateProject(true)}>
          <i className="bi bi-plus-circle"></i> Add New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="no-projects">
          <i className="bi bi-folder-x"></i>
          <h3>No active projects</h3>
          <p>Create your first project to get started</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-header">
                <div className="project-header-left">
                  <span className="project-category">{project.category}</span>
                  <span className={`project-status ${project.status}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-description">
                  {expandedDescriptions[project._id] ? (
                    <p>{project.description}</p>
                  ) : (
                    <p>{truncateText(project.description)}</p>
                  )}
                  {project.description.length > 100 && (
                    <span 
                      className="read-more-link"
                      onClick={() => toggleDescription(project._id)}
                    >
                      {expandedDescriptions[project._id] ? 'Show less' : 'Read more'}
                    </span>
                  )}
                </div>
                <p className="project-location">
                  <i className="bi bi-geo-alt"></i> {project.location}
                </p>
              </div>

              <div className="project-funding">
                <div className="funding-info">
                  <span className="raised">{formatCurrency(project.raisedAmount || 0)}</span>
                  <span className="goal">of {formatCurrency(project.goalAmount)}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${getProgressPercentage(project.raisedAmount || 0, project.goalAmount)}%`}}
                  ></div>
                </div>
                <div className="progress-text">
                  {getProgressPercentage(project.raisedAmount || 0, project.goalAmount).toFixed(1)}% funded
                </div>
              </div>

              <div className="project-dates">
                <div className="date-item">
                  <i className="bi bi-calendar-event"></i>
                  <span>Start: {formatDate(project.startDate)}</span>
                </div>
                <div className="date-item">
                  <i className="bi bi-calendar-check"></i>
                  <span>End: {formatDate(project.endDate)}</span>
                </div>
              </div>

              <div className="project-actions">
                <div className="dropdown-container">
                  <button
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown(project._id)}
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  {dropdownOpen === project._id && (
                    <div className="dropdown-menu">
                      <button
                        className="dropdown-item edit-item"
                        onClick={() => {
                          setSelectedProject(project);
                          setEditProjectModal(true);
                          setDropdownOpen(null);
                        }}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button
                        className="dropdown-item delete-item"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this project?')) {
                            deleteProject(project._id);
                          }
                          setDropdownOpen(null);
                        }}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {createProject && (
        <Modal onClose={() => setCreateProject(false)}>
          <CreateProject onClose={() => setCreateProject(false)} />
        </Modal>
      )}
      {editProjectModal && (
        <Modal onClose={() => setEditProjectModal(false)}>
          <EditProject
            projectData={selectedProject}
            onClose={() => setEditProjectModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminProjects;
