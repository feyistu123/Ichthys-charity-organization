import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { images } from "../assets/Images/images";
import "./NavBar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <h1 className="logo-title">
          <img className="logo" src={images.Ichtus} alt="Ichthys logo" />
          <p style={{ marginLeft: "3px" }}>Ichthys</p>
          <em style={{ fontSize: "12px", marginRight: "30px" }}>(ἰχθύς)</em>
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
          <NavLink to="/accounts" onClick={closeMenu}>
            Log in
          </NavLink>

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
