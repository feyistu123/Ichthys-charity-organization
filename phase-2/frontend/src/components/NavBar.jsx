import React, { useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../assets/Images/images";
import { DonationForm } from "../PublicPages/GetInvolved";

const NavBar = () => {
  const [showDonateForm, setDonationForm] = useState(false);
  return (
    <div class="header">
      <h1>
        <img class="logo" src={images.Ichtus} alt="logo" />
        Ichthys <em>(ἰχθύς)</em>
      </h1>
      <div className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/blogs">Blog</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/get-involved">Get Involved</Link>
        <Link to="/contact-us">Contact us</Link>
        <Link to="/accounts">Log in</Link>
        <Link to="/adminDashboard">Admin Dashboard</Link>
        <button onClick={() => setDonationForm(true)} class="donate">
          Donate Now
        </button>
        {showDonateForm && <DonationForm />}
      </div>

      <div class="hamburger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default NavBar;
