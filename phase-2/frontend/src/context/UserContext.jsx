import { createContext, useContext, useEffect, useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const RegisterUser = async (newUser) => {
    try {
      let res = etc;
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const allVolunteers = async () => {
    try {
      let res = await fetch("http://localhost:3000/volunteers");
      let data = await res.json();
      setVolunteers(data);
    } catch (err) {
      console.log("error: ", err);
    }
  };
  useEffect(() => {
    allVolunteers();
  }, []);
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
    <UserContext.Provider value={{ signUpVolunteer, sendFeedBack, volunteers }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserData = () => useContext(UserContext);
