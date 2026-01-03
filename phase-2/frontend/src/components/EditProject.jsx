import React, { useState } from "react";
import { useData } from "../context/DataContext";

const EditProject = ({ projectData, onClose }) => {
  const { editProject } = useData();

  const [project, setProject] = useState({ ...projectData });

  const handleChange = (e) => {
    let value = e.target.value;
    if (
      ["goalAmount", "raisedAmount", "peopleImpacted"].includes(e.target.name)
    ) {
      value = Number(value);
    }
    setProject({ ...project, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProject({ id: projectData.id, upDatedData: project });
    console.log("Project edited:", project);
    onClose(); // close modal
  };

  return (
    <div className="create-project-container">
      <h2 className="form-title">Edit Project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <input
          className="project-input"
          placeholder="Title"
          type="text"
          name="title"
          onChange={handleChange}
          value={project.title}
          required
        />
        <textarea
          className="project-input textarea"
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={project.description}
          required
        />
        <input
          className="project-input"
          placeholder="Category"
          type="text"
          list="category-list"
          name="category"
          onChange={handleChange}
          value={project.category}
          required
        />
        <datalist id="category-list">
          <option value="Education" />
          <option value="Health" />
          <option value="Environment" />
          <option value="Community" />
        </datalist>
        <input
          className="project-input"
          placeholder="Location"
          type="text"
          name="location"
          onChange={handleChange}
          value={project.location}
          required
        />
        <input
          className="project-input"
          placeholder="Goal Amount"
          type="number"
          name="goalAmount"
          onChange={handleChange}
          value={project.goalAmount}
          required
        />
        <div className="date-status">
          <input
            className="project-input"
            placeholder="Start Date"
            type="date"
            name="startDate"
            onChange={handleChange}
            value={project.startDate}
            required
          />
          <input
            className="project-input"
            placeholder="End Date"
            type="date"
            name="endDate"
            onChange={handleChange}
            value={project.endDate}
            required
          />
          <div className="status-field">
            <label htmlFor="status">Status:</label>
            <select
              className="project-input"
              name="status"
              id="status"
              onChange={handleChange}
              value={project.status}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <button type="submit" className="project-submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;
