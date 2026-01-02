import React from "react";
const Footer = () => {
  return (
    <footer id="footer">
      <div id="footer-container">
        <div id="foot-intro">
          <h3>Ichthys</h3>
          <p>
            Building stronger communities through education, empowerment, and
            compassion.
          </p>
          <div>
            <i class="bi bi-facebook"></i>
            <i class="bi bi-twitter"></i>
            <i class="bi bi-instagram"></i>
            <i class="bi bi-linkedin"></i>
          </div>
        </div>

        <div>
          <h3>Get Involved</h3>
          <p>Volunteer</p>
          <p>Donate</p>
          <p>Partner With Us</p>
          <p>Events</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>
            <i class="bi bi-geo-alt-fill"></i> Bole, Community Center
          </p>
          <p>
            <i class="bi bi-phone-fill"></i> (011) 724-4937
          </p>
          <p>
            <i class="bi bi-envelope-fill"></i> info@ichthys.org
          </p>
        </div>

        <p id="footer-copy">© 2025 Ichthys. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
