import React, { useState } from "react";
import { useData } from "../context/DataContext";
import CreateProject from "../components/CreateProject";
import Modal from "./Modal";
import EditProject from "../components/EditProject";

const AdminProjects = () => {
  const { projects, deleteProject } = useData();
  const [createProject, setCreateProject] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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
                <span className="project-category">{project.category}</span>
                <span className={`project-status ${project.status}`}>
                  {project.status}
                </span>
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
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
                <button
                  className="edit-btn"
                  onClick={() => {
                    setSelectedProject(project);
                    setEditProjectModal(true);
                  }}
                  title="Edit Project"
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this project?')) {
                      deleteProject(project._id);
                    }
                  }}
                  title="Delete Project"
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
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
