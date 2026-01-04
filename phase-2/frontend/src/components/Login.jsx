import React, { useState } from "react";
import { useUserData } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Donor");
  const { loginUser } = useUserData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password, role };
    const loggedInUser = await loginUser(user);
    if (loggedInUser) {
      console.log("User logged in:", loggedInUser);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="login-title">Login to your account</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="login-input email-input"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-input password-input"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="login-label" htmlFor="role">
            Login as
          </label>
          <select
            id="role"
            className="login-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Donor</option>
            <option>Volunteer</option>
            <option>Admin</option>
          </select>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
