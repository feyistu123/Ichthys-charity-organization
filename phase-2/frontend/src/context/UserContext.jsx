import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../axios/api";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const RegisterUser = async (newUser) => {
    try {
      const res = await api.post("/users/register", newUser);
      const data = res.data;
      alert(data.message);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const loginUser = async (user) => {
    try {
      const res = await api.post("/users/login", user);
      const data = res.data;
      console.log("Login success:", data);
      alert(data.message || "Logged in successfully!");
      localStorage.setItem("token", data.token);
      return data.user;
    } catch (err) {
      console.error("Login error:", err);
      const message = err.response?.data?.message || "Login failed";
      alert(message);

      return null;
    }
  };

  const allVolunteers = async () => {
    try {
      let res = await fetch("http://localhost:3000/volunteers");
      if (!res) throw new Error("not registered Successfully");
      let data = await res.json();
      alert("You Registered");
      alert(data.message);
    } catch (err) {
      console.log("error: ", err);
    }
  };
  useEffect(() => {});
  const signUpVolunteer = async (newVolunteer) => {
    try {
      let res = await fetch("http://localhost:3000/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVolunteer),
      });
      if (!res.ok) throw new Error("signup Failed");
      alert("You Signed Up Successfully");
    } catch (err) {
      console.log("error: ", err);
    }
  };
  const sendFeedBack = async (newFeedBack) => {
    try {
      let res = await fetch("http://localhost:3000/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedBack),
      });
      if (!res.ok) throw new Error("signup Failed");
      console.log(" you send feed back successfully");
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        RegisterUser,
        loginUser,
        signUpVolunteer,
        sendFeedBack,
        volunteers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserData = () => useContext(UserContext);
