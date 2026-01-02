import React, { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const CreateProject = () => {
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
    status: "active",
  };
  const [project, setProject] = useState(initials);
  const { createProject } = useContext(DataContext);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(project);
    console.log("created");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          type="text"
          name="title"
          onChange={handleChange}
          value={project.title}
        />
        <input
          placeholder="description"
          type="text"
          name="description"
          onChange={handleChange}
          value={project.description}
        />
        <input
          placeholder="category"
          type="text"
          list="list-suggestion"
          name="category"
          onChange={handleChange}
          value={project.category}
        />
        <datalist id="list-suggestion">
          <option>Education</option>
          <option>Health</option>
        </datalist>
        <input
          placeholder="Location"
          name="location"
          type="text"
          onChange={handleChange}
          value={project.location}
        />
        <input
          placeholder="Goal Amount"
          type="number"
          onChange={handleChange}
          name="goalAmount"
          value={project.goalAmount}
        />
        {/* <input placeholder="Raised Amount" /> */}
        <input
          placeholder="Start Date"
          type="date"
          onChange={handleChange}
          name="startDate"
          value={project.startDate}
        />
        <input
          placeholder="End date"
          type="date"
          onChange={handleChange}
          name="endDate"
          value={project.endDate}
        />
        <select onChange={handleChange} name="status" value={project.status}>
          <option>active</option>
          <option>completed</option>
        </select>
        {/* <input /> */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateProject;
