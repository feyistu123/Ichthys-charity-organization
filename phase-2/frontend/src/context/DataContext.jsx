import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const allProjects = async () => {
    let res = await fetch("http://localhost:3000/projects");
    let data = await res.json();
    setProjects(data);
    console.log(data);
  };
  useEffect(() => {
    allProjects();
  }, []);

  const createProject = async (newProject) => {
    try {
      let res = await fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) throw new Error("New Project is not Created");
      alert("Successfully created new project");
      console.log("Succeed");
      allProjects();
    } catch (err) {
      console.log(err.message);
    }
  };
  const editProject = async ({ id, upDatedData }) => {
    try {
      const res = await fetch(`http://localhost:3000/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(upDatedData),
      });

      if (!res.ok) throw new Error("Project is not Edited");
      const updatedProject = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
      );

      alert("Successfully edited project");
      console.log("Edit succeeded", updatedProject);
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteProject = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Project is not Deleted");
      allProjects();
      alert("Successfully deleted project");
      console.log("Edit succeeded", filtered);
    } catch (err) {
      console.error(err.message);
    }
  };
  const createEvent = async (newEvent) => {
    try {
      let res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) throw new Error("New Event is not Created");
      alert("Successfully created new event");
      console.log("Succeed");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <DataContext.Provider
      value={{
        projects,
        createProject,
        editProject,
        deleteProject,
        events,
        createEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
