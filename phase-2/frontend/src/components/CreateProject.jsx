import React, { useState, useContext } from "react";
import { useData } from "../context/DataContext";

const CreateProject = ({ onClose }) => {
  const initials = {
    title: "",
    description: "",
    category: "",
    location: "",
    goalAmount: "",
    raisedAmount: 0,
    peopleImpacted: 0,
    startDate: "",
    endDate: "",
    status: "Active",
    image: null,
  };

  const [project, setProject] = useState(initials);
  const { createProject } = useData();

  const handleChange = (e) => {
    let value = e.target.value;
    if (
      ["goalAmount", "raisedAmount", "peopleImpacted"].includes(e.target.name)
    ) {
      value = Number(value);
    }
    setProject({ ...project, [e.target.name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setProject({ ...project, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(project);
      setProject(initials);
      onClose?.();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="create-project-container">
      <h2 className="form-title">Create New Project</h2>
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
        <input
          className="project-input"
          placeholder="Number of People Impacted"
          type="number"
          name="peopleImpacted"
          onChange={handleChange}
          value={project.peopleImpacted}
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
          <br />
          <div className="status-field">
            <label htmlFor="status">Status:</label>
            <select
              className="project-input"
              name="status"
              id="status"
              onChange={handleChange}
              value={project.status}
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
            {/* <input
              type="file"
              name="avatar"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            /> */}
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="project-input"
            />
          </div>
          <button type="submit" className="project-submit-btn">
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
