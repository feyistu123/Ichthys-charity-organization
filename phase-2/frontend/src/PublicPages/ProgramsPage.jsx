import React from "react";
import NavBar from "../components/NavBar";
import { Link, Outlet } from "react-router-dom";
import "../style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";

export const Projects = () => {
  return (
    <div className="project-cards">
      <div className="project-card">
        <img className="project-image" />

        <div className="project-tags">
          <p className="project-field">Education</p>
          <p className="project-status active">Active</p>
        </div>

        <div className="project-description">
          <h4>Build Schools in Rural Communities</h4>
          <p>
            Constructing sustainable schools to provide quality education for
            children in underserved rural areas.
          </p>
        </div>

        <div className="project-location">
          <i className="bi bi-geo-alt"></i>
          <h3>Rural Kenya</h3>
        </div>

        <div className="project-stats">
          <div className="stat-box">
            <h3>Raised</h3>
            <p>$65,000</p>
          </div>

          <div className="stat-box">
            <h3>Goal</h3>
            <p>$100,000</p>
          </div>
        </div>

        <div className="project-footer">
          <div className="impact-info">
            <i class="bi bi-people"></i>
            <p>500 people impacted</p>
          </div>

          <div className="date-info">
            <i class="bi bi-calendar-date"></i>
            <p className="project-date"> 6/1/2024 - 12/31/2025</p>
          </div>

          <button className="support-btn">Support This Project</button>
        </div>
      </div>
      <div className="project-card">
        <img className="project-image" />

        <div className="project-tags">
          <p className="project-field">Education</p>
          <p className="project-status active">Active</p>
        </div>

        <div className="project-description">
          <h4>Build Schools in Rural Communities</h4>
          <p>
            Constructing sustainable schools to provide quality education for
            children in underserved rural areas.
          </p>
        </div>

        <div className="project-location">
          <i className="bi bi-geo-alt"></i>
          <h3>Rural Kenya</h3>
        </div>

        <div className="project-stats">
          <div className="stat-box">
            <h3>Raised</h3>
            <p>$65,000</p>
          </div>

          <div className="stat-box">
            <h3>Goal</h3>
            <p>$100,000</p>
          </div>
        </div>

        <div className="project-footer">
          <div className="impact-info">
            <i class="bi bi-people"></i>
            <p>500 people impacted</p>
          </div>

          <div className="date-info">
            <i class="bi bi-calendar-date"></i>
            <p className="project-date"> 6/1/2024 - 12/31/2025</p>
          </div>

          <button className="support-btn">Support This Project</button>
        </div>
      </div>
      <div className="project-card">
        <img className="project-image" />

        <div className="project-tags">
          <p className="project-field">Education</p>
          <p className="project-status active">Active</p>
        </div>

        <div className="project-description">
          <h4>Build Schools in Rural Communities</h4>
          <p>
            Constructing sustainable schools to provide quality education for
            children in underserved rural areas.
          </p>
        </div>

        <div className="project-location">
          <i className="bi bi-geo-alt"></i>
          <h3>Rural Kenya</h3>
        </div>

        <div className="project-stats">
          <div className="stat-box">
            <h3>Raised</h3>
            <p>$65,000</p>
          </div>

          <div className="stat-box">
            <h3>Goal</h3>
            <p>$100,000</p>
          </div>
        </div>

        <div className="project-footer">
          <div className="impact-info">
            <i class="bi bi-people"></i>
            <p>500 people impacted</p>
          </div>

          <div className="date-info">
            <i class="bi bi-calendar-date"></i>
            <p className="project-date"> 6/1/2024 - 12/31/2025</p>
          </div>

          <button className="support-btn">Support This Project</button>
        </div>
      </div>
      <div className="project-card">
        <img className="project-image" />

        <div className="project-tags">
          <p className="project-field">Education</p>
          <p className="project-status active">Active</p>
        </div>

        <div className="project-description">
          <h4>Build Schools in Rural Communities</h4>
          <p>
            Constructing sustainable schools to provide quality education for
            children in underserved rural areas.
          </p>
        </div>

        <div className="project-location">
          <i className="bi bi-geo-alt"></i>
          <h3>Rural Kenya</h3>
        </div>

        <div className="project-stats">
          <div className="stat-box">
            <h3>Raised</h3>
            <p>$65,000</p>
          </div>

          <div className="stat-box">
            <h3>Goal</h3>
            <p>$100,000</p>
          </div>
        </div>

        <div className="project-footer">
          <div className="impact-info">
            <i class="bi bi-people"></i>
            <p>500 people impacted</p>
          </div>
          <div className="date-info">
            <i class="bi bi-calendar-date"></i>
            <p className="project-date"> 6/1/2024 - 12/31/2025</p>
          </div>

          <button className="support-btn">Support This Project</button>
        </div>
      </div>
    </div>
  );
};
export const Completed = () => {
  return (
    <div className="project-card">
      <img className="project-image" />

      <div className="project-tags">
        <p className="project-field">Education</p>
        <p className="project-status active">completed</p>
      </div>

      <div className="project-description">
        <h4>Build Schools in Rural Communities</h4>
        <p>
          Constructing sustainable schools to provide quality education for
          children in underserved rural areas.
        </p>
      </div>

      <div className="project-location">
        <i class="bi bi-people"></i>
        <h3>Rural Kenya</h3>
      </div>

      <div className="project-stats">
        <div className="stat-box">
          <h3>Raised</h3>
          <p>$65,000</p>
        </div>

        <div className="stat-box">
          <h3>Goal</h3>
          <p>$100,000</p>
        </div>
      </div>

      <div className="project-footer">
        <div className="impact-info">
          <i class="bi bi-people"></i>
          <p>500 people impacted</p>
        </div>

        <div className="date-info">
          <i class="bi bi-calendar-date"></i>
          <p className="project-date"> 6/1/2024 - 12/31/2025</p>
        </div>

        <button className="support-btn">Support This Project</button>
      </div>
    </div>
  );
};

export const ActiveProjects = () => {
  return (
    <div className="project-card">
      <img className="project-image" />

      <div className="project-tags">
        <p className="project-field">Education</p>
        <p className="project-status active">active</p>
      </div>

      <div className="project-description">
        <h4>Build Schools in Rural Communities</h4>
        <p>
          Constructing sustainable schools to provide quality education for
          children in underserved rural areas.
        </p>
      </div>

      <div className="project-location">
        <i className="bi bi-geo-alt"></i>
        <h3>Rural Kenya</h3>
      </div>

      <div className="project-stats">
        <div className="stat-box">
          <h3>Raised</h3>
          <p>$65,000</p>
        </div>

        <div className="stat-box">
          <h3>Goal</h3>
          <p>$100,000</p>
        </div>
      </div>

      <div className="project-footer">
        <div className="impact-info">
          <i class="bi bi-people"></i>
          <p>500 people impacted</p>
        </div>

        <div className="date-info">
          <i class="bi bi-calendar-date"></i>
          <p className="project-date"> 6/1/2024 - 12/31/2025</p>
        </div>

        <button className="support-btn">Support This Project</button>
      </div>
    </div>
  );
};
const ProgramsPage = () => {
  return (
    <div className="programs-page">
      <NavBar />

      <div className="programs-header">
        <h2>Our Programs & Projects</h2>
        <p>
          Discover the impact we're making around the world. Each project is
          designed to create sustainable change and improve lives in communities
          that need it most.
        </p>
      </div>

      <div className="programs-summary">
        <div className="summary-box">
          <h4>Total Projects</h4>
          <p>4</p>
        </div>
        <div className="summary-box">
          <h4>Active</h4>
          <p>3</p>
        </div>
        <div className="summary-box">
          <h4>Completed</h4>
          <p>1</p>
        </div>
        <div className="summary-box">
          <h4>People Helped</h4>
          <p>7000</p>
        </div>
        <div className="summary-box">
          <h4>Total Raised</h4>
          <p>$229,500</p>
        </div>
      </div>

      <nav className="programs-filter">
        <Link className="filter-link active" to="project">
          All Projects
        </Link>
        <Link className="filter-link" to="active">
          Active
        </Link>
        <Link className="filter-link" to="complete">
          Completed
        </Link>
      </nav>

      <Outlet />
      <Footer />
    </div>
  );
};

export default ProgramsPage;
