import React, { useState } from "react";
import { useUserData } from "../context/UserContext";

const Signup = () => {
  const userInitial = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  };
  const { RegisterUser } = useUserData();
  const [user, setUser] = useState(userInitial);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    await RegisterUser(user);
    setUser(userInitial);
  };
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h3 className="signup-title">Create Your Account</h3>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-label" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="fullName"
            value={user.fullName}
            className="signup-input name-input"
            placeholder="Enter Your Name"
            onChange={handleChange}
          />

          <label className="signup-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            name="email"
            className="signup-input email-input"
            placeholder="email@example.com"
            onChange={handleChange}
          />

          <label className="signup-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            className="signup-input password-input"
            placeholder="*****"
            onChange={handleChange}
          />

          <label className="signup-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={user.confirmPassword}
            className="signup-input confirm-password-input"
            placeholder="*****"
            onChange={handleChange}
          />

          <label className="signup-label" htmlFor="userType">
            Sign Up As
          </label>
          <select
            id="userType"
            className="signup-select"
            name="userType"
            value={user.userType}
            onChange={handleChange}
          >
            <option>Donor</option>
            <option>Staff</option>
          </select>

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
