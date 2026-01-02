import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <NavBar />

      <div className="auth-header">
        <h3 className="auth-title">Welcome to Ichtyls</h3>
        <p className="auth-subtitle">Login or Create an Account</p>
      </div>

      <nav className="auth-nav">
        <Link to="login" className="auth-link">
          Login
        </Link>
        <Link to="register" className="auth-link">
          Sign Up
        </Link>
      </nav>

      <div className="auth-content">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
