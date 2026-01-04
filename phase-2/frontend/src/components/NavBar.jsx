import React, { useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../assets/Images/images";
import { DonationForm } from "../PublicPages/GetInvolved";

const NavBar = () => {
  const [showDonateForm, setShowDonateForm] = useState(false);

  return (
    <>
      <header className="header">
        <h1 className="logo-title">
          <img className="logo" src={images.Ichtus} alt="Ichthys logo" />
          Ichthys <em>(ἰχθύς)</em>
        </h1>

        <nav className="navbar">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/events">Events</Link>
          <Link to="/blogs">Blog</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/get-involved">Get Involved</Link>
          <Link to="/contact-us">Contact us</Link>
          <Link to="/accounts">Log in</Link>
          <Link to="/adminDashboard">Admin Dashboard</Link>

          <button className="donate" onClick={() => setShowDonateForm(true)}>
            Donate Now
          </button>
        </nav>

        <div className="hamburger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="hamburger-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </header>

      {showDonateForm && (
        <DonationForm onClose={() => setShowDonateForm(false)} />
      )}
    </>
  );
};

export default NavBar;
