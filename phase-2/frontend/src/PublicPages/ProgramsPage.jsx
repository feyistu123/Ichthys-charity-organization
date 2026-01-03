import React from "react";
import NavBar from "../components/NavBar";
import { Link, Outlet } from "react-router-dom";
import "../style.css";
import Footer from "../components/Footer";
import { useData } from "../context/DataContext";

export const Projects = () => {
  const { projects } = useData();
  return (
    <div className="project-cards">
      {projects.length === 0 ? (
        <h3>there are no new projects</h3>
      ) : (
        projects.map((p) => (
          <div key={p.id} className="project-card">
            <img className="project-image" alt={p.title} />

            <div className="project-tags">
              <p className="project-field">{p.category}</p>
              <p className="project-status active">{p.status}</p>
            </div>

            <div className="project-description">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>

            <div className="project-location">
              <i className="bi bi-geo-alt"></i>
              <h3>{p.location}</h3>
            </div>

            <div className="project-stats">
              <div className="stat-box">
                <h3>Raised</h3>
                <p>{p.raisedAmount}</p>
              </div>

              <div className="stat-box">
                <h3>Goal</h3>
                <p>{p.goalAmount}</p>
              </div>
            </div>

            <div className="project-footer">
              <div className="impact-info">
                <i class="bi bi-people"></i>
                <p>impacted people : {p.peopleImpacted}</p>
              </div>

              <div className="date-info">
                <i class="bi bi-calendar-date"></i>
                <p className="project-date">
                  {" "}
                  {p.startDate} - {p.endDate}
                </p>
              </div>

              <button className="support-btn">Support This Project</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export const Completed = () => {
  const { projects } = useData();
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <div className="project-cards">
      {completedProjects.length === 0 ? (
        <h3>There are no completed projects</h3>
      ) : (
        completedProjects.map((p) => (
          <div key={p.id} className="project-card">
            <img className="project-image" alt={p.title} />

            <div className="project-tags">
              <p className="project-field">{p.category}</p>
              <p className="project-status completed">{p.status}</p>
            </div>

            <div className="project-description">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>

            <div className="project-location">
              <i className="bi bi-geo-alt"></i>
              <h3>{p.location}</h3>
            </div>

            <div className="project-stats">
              <div className="stat-box">
                <h3>Raised</h3>
                <p>{p.raisedAmount}</p>
              </div>

              <div className="stat-box">
                <h3>Goal</h3>
                <p>{p.goalAmount}</p>
              </div>
            </div>

            <div className="project-footer">
              <div className="impact-info">
                <i className="bi bi-people"></i>
                <p>Impacted people: {p.peopleImpacted}</p>
              </div>

              <div className="date-info">
                <i className="bi bi-calendar-date"></i>
                <p className="project-date">
                  {p.startDate} – {p.endDate}
                </p>
              </div>

              <button className="support-btn">Support This Project</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export const ActiveProjects = () => {
  const { projects } = useData();
  const activeProjects = projects.filter((p) => p.status === "active");
  return (
    <div className="project-card">
      {activeProjects.length === 0 ? (
        <h3>There are no Active projects</h3>
      ) : (
        activeProjects.map((p) => (
          <div key={p.id} className="project-card">
            <img className="project-image" alt={p.title} />

            <div className="project-tags">
              <p className="project-field">{p.category}</p>
              <p className="project-status completed">{p.status}</p>
            </div>

            <div className="project-description">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>

            <div className="project-location">
              <i className="bi bi-geo-alt"></i>
              <h3>{p.location}</h3>
            </div>

            <div className="project-stats">
              <div className="stat-box">
                <h3>Raised</h3>
                <p>{p.raisedAmount}</p>
              </div>

              <div className="stat-box">
                <h3>Goal</h3>
                <p>{p.goalAmount}</p>
              </div>
            </div>

            <div className="project-footer">
              <div className="impact-info">
                <i className="bi bi-people"></i>
                <p>Impacted people: {p.peopleImpacted}</p>
              </div>

              <div className="date-info">
                <i className="bi bi-calendar-date"></i>
                <p className="project-date">
                  {p.startDate} – {p.endDate}
                </p>
              </div>

              <button className="support-btn">Support This Project</button>
            </div>
          </div>
        ))
      )}
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
