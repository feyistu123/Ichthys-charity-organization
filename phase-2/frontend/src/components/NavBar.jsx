import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { images } from "../assets/Images/images";
import { useUserData } from "../context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useUserData();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (currentUser) {
      logoutUser();
      navigate("/");
    } else {
      navigate("/accounts");
    }
    closeMenu();
  };

  return (
    <>
      <header className="header">
        <h1 className="logo-title">
          <img className="logo" src={images.Ichtus} alt="Ichthys logo" />
          <p style={{ fontSize: "24px" }}><span className="ichthys-brand">Ichthys</span></p>
          <em style={{ fontSize: "18px", marginRight: "30px" }} className="ichthys-greek">(ἰχθύς)</em>
        </h1>

        <nav className={`navbar ${isMenuOpen ? "navbar-open" : ""}`}>
          <NavLink to="/home" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/events" onClick={closeMenu}>
            Events
          </NavLink>
          <NavLink to="/blogs" onClick={closeMenu}>
            Blog
          </NavLink>
          <NavLink to="/programs" onClick={closeMenu}>
            Programs
          </NavLink>
          <NavLink to="/get-involved" onClick={closeMenu}>
            Get Involved
          </NavLink>
          <NavLink to="/contact-us" onClick={closeMenu}>
            Contact us
          </NavLink>
          <span onClick={handleAuthAction} className="auth-link">
            {currentUser ? "Logout" : "Log in"}
          </span>

          <button
            className="donate"
            onClick={() => {
              navigate("/donate");
              closeMenu();
            }}
          >
            Donate Now
          </button>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
    </>
  );
};

export default NavBar;
