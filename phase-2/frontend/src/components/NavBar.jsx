import React, { useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../assets/Images/images";
import { DonationForm } from "../PublicPages/GetInvolved";
import "./NavBar.css";

const NavBar = () => {
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              setShowDonateForm(true);
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
      </header>

      {/* Mobile overlay */}
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      ></div>

      {showDonateForm && (
        <DonationForm onClose={() => setShowDonateForm(false)} />
      )}
    </>
  );
};

export default NavBar;
