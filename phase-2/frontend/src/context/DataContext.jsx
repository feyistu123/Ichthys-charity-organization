import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../axios/api";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);

  const allProjects = async () => {
    try {
      const res = await api.get("/programs");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    allProjects();
  }, []);

  const createProject = async (newProject) => {
    try {
      await api.post("/programs/add", newProject);
      alert("Successfully created new project");
      allProjects();
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Failed to create project");
    }
  };
  const editProject = async ({ id, upDatedData }) => {
    try {
      await api.patch(`/programs/${id}`, upDatedData);
      alert("Successfully edited project");
      allProjects();
    } catch (err) {
      console.error("Error editing project:", err);
      alert("Failed to edit project");
    }
  };
  const deleteProject = async (id) => {
    try {
      await api.delete(`/programs/${id}`);
      alert("Successfully deleted project");
      allProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project");
    }
  };
  const allEvents = async () => {
    try {
      const res = await api.get("/events");
      const { upcoming, past } = res.data;
      setEvents([...upcoming, ...past]);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    allEvents();
  }, []);
  const createEvent = async (newEvent) => {
    try {
      await api.post("/events/add", newEvent);
      alert("Successfully created new event");
      allEvents();
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    }
  };
  const editEvent = async ({ id, upDatedData }) => {
    try {
      await api.patch(`/events/${id}`, upDatedData);
      alert("Successfully edited Event");
      allEvents();
    } catch (err) {
      console.error("Error editing event:", err);
      // amazonq-ignore-next-line
      alert("Failed to edit event");
    }
  };
  const deleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      alert("Successfully deleted event");
      allEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      // alert("Failed to delete event");
    }
  };
  const allPosts = async () => {
    try {
      const res = await api.get("/blogs");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    allPosts();
  }, []);
  const createPost = async (newPost) => {
    try {
      await api.post("/blogs/add", newPost);
      alert("Successfully created new Post");
      allPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      // alert("Failed to create post");
    }
  };
  const editPost = async ({ id, upDatedData }) => {
    try {
      await api.patch(`/blogs/${id}`, upDatedData);
      // alert("Successfully edited Post");
      allPosts();
    } catch (err) {
      console.error("Error editing post:", err);
      // alert("Failed to edit post");
    }
  };
  const deletePost = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      // alert("Successfully deleted post");
      allPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      // alert("Failed to delete post");
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
