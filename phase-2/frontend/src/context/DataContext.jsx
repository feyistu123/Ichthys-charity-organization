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
    } catch (err) {
      console.error(err.message);
    }
  };
  const allEvents = async () => {
    let res = await fetch("http://localhost:3000/events");
    let data = await res.json();
    setEvents(data);
  };
  useEffect(() => {
    allEvents();
  }, []);
  const createEvent = async (newEvent) => {
    try {
      let res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) throw new Error("New Event is not Created");
      alert("Successfully created new event");
      allEvents();
    } catch (err) {
      console.log(err.message);
    }
  };
  const editEvent = async ({ id, upDatedData }) => {
    try {
      const res = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(upDatedData),
      });

      if (!res.ok) throw new Error("Project is not Edited");
      const updatedEvent = await res.json();
      setEvents((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedEvent } : p))
      );

      alert("Successfully edited Event");
      console.log("Edit succeeded", updatedEvent);
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteEvent = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Event is not Deleted");
      allEvents();
      alert("Successfully deleted event");
    } catch (err) {
      console.error(err.message);
    }
  };
  const allPosts = async () => {
    let res = await fetch("http://localhost:3000/posts");
    let data = await res.json();
    setPosts(data);
  };
  useEffect(() => {
    allEvents();
  }, []);
  const createPost = async (newPost) => {
    try {
      let res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("New Post is not Created");
      alert("Successfully created new Post");
      allPosts();
    } catch (err) {
      console.log(err.message);
    }
  };
  const editPost = async ({ id, upDatedData }) => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(upDatedData),
      });

      if (!res.ok) throw new Error("posts is not Edited");
      const updatedPosts = await res.json();
      setEvents((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedPosts } : p))
      );

      alert("Successfully edited Event");
      console.log("Edit succeeded", updatedPosts);
    } catch (err) {
      console.error(err.message);
    }
  };
  const deletePost = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Event is not Deleted");
      allPosts();
      alert("Successfully deleted event");
    } catch (err) {
      console.error(err.message);
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
        editEvent,
        deleteEvent,
        posts,
        createPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
