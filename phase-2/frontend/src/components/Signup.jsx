import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState();
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h3 className="signup-title">Create Your Account</h3>
        <form className="signup-form">
          <label className="signup-label" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="signup-input name-input"
            placeholder="Enter Your Name"
          />

          <label className="signup-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="signup-input email-input"
            placeholder="email@example.com"
          />

          <label className="signup-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="signup-input password-input"
            placeholder="*****"
          />

          <label className="signup-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="signup-input confirm-password-input"
            placeholder="*****"
          />

          <label className="signup-label" htmlFor="role">
            Sign Up As
          </label>
          <select id="role" className="signup-select">
            <option>Donor</option>
            <option>Volunteer</option>
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
