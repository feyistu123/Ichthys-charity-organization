import React from "react";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="login-title">Login to your account</h3>
        <form className="login-form">
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="login-input email-input"
            placeholder="email@example.com"
          />

          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-input password-input"
            placeholder="*****"
          />

          <label className="login-label" htmlFor="role">
            Login as
          </label>
          <select id="role" className="login-select">
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
