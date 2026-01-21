import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          Ichthys <em>(ἰχθύς)</em>
        </h1>

        <nav className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}>
          <Link to="/home" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/events" onClick={closeMenu}>Events</Link>
          <Link to="/blogs" onClick={closeMenu}>Blog</Link>
          <Link to="/programs" onClick={closeMenu}>Programs</Link>
          <Link to="/get-involved" onClick={closeMenu}>Get Involved</Link>
          <Link to="/contact-us" onClick={closeMenu}>Contact us</Link>
          <Link to="/accounts" onClick={closeMenu}>Log in</Link>

          <button 
            className="donate" 
            onClick={() => {
              navigate('/donate');
              closeMenu();
            }}
          >
            Donate Now
          </button>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
        </div>

        {/* Mobile donate button - shows only on small screens */}
        <button 
          className="mobile-donate-btn" 
          onClick={() => navigate('/donate')}
        >
          Donate
        </button>
      </header>

      {/* Mobile overlay */}
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      ></div>
    </>
  );
};

export default NavBar;
