import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  // const allProjects = async()=>{
  //   let res = fetch("http://localhost:3000/projects")

  // }

  const createProject = async (newProject) => {
    let res = await fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });
    try {
      if (!res.ok) throw new Error("New Project is not Created");
      alert("Successfully created new project");
      console.log("Succeed");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <DataContext.Provider value={{ createProject }}>
      {children}
    </DataContext.Provider>
  );
};

// export default useData = () => {
//   useContext(DataContext);
// };
