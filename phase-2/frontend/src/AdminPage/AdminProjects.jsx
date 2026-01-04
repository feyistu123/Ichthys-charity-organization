import React, { useState } from "react";
import { useData } from "../context/DataContext";
import CreateProject from "../components/CreateProject";
import Modal from "./Modal";
import EditProject from "../components/EditProject";

const AdminProjects = () => {
  const { projects } = useData();
  const [createProject, setCreateProject] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { deleteProject } = useData();
  return (
    <div className="admin-projects-container">
      {projects.length === 0 ? (
        <h3 className="no-projects">There are no active projects</h3>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <span className="project-category">{project.category}</span>
              <span className={`project-status ${project.status}`}>
                {project.status}
              </span>
            </div>

            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>

            <p className="project-location">{project.location}</p>

            <div className="project-dates">
              <div>
                <i className="bi bi-calendar3"></i>{" "}
                <span className="start-date">{project.startDate}</span>
              </div>
              -
              <div>
                <i className="bi bi-calendar3"></i>{" "}
                <span className="end-date">{project.endDate}</span>
              </div>
            </div>

            <div className="project-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setSelectedProject(project);
                  setEditProjectModal(true);
                }}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteProject(project.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))
      )}

      <button className="new-project" onClick={() => setCreateProject(true)}>
        Add new Project
      </button>

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
