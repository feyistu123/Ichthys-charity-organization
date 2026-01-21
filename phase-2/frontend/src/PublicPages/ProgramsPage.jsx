import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import "../style.css";
import Footer from "../components/Footer";
import { useData } from "../context/DataContext";

export const Projects = () => {
  const { projects } = useData();
  const navigate = useNavigate();
  return (
    <div className="project-cards">
      {projects.length === 0 ? (
        <h3>there are no new projects</h3>
      ) : (
        projects.map((p) => (
          <div key={p._id} className="project-card">
            <img className="project-image" src={p.image} alt={p.title} />

            <div className="project-tags">
              <p className="project-field">{p.category}</p>
              <p className={`project-status ${p.status.toLowerCase()}`}>
                {p.status}
              </p>
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

              <button className="support-btn" onClick={() => navigate('/donate')}>Support This Project</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export const Completed = () => {
  const { projects } = useData();
  const navigate = useNavigate();
  const completedProjects = projects.filter((p) => p.status === "Completed");

  return (
    <div className="project-cards">
      {completedProjects.length === 0 ? (
        <h3>There are no completed projects</h3>
      ) : (
        completedProjects.map((p) => (
          <div key={p._id} className="project-card">
            <img className="project-image" src={p.image} alt={p.title} />

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
                <p className="project-date">
                  <i className="bi bi-calendar-date"></i>
                  {p.startDate} – {p.endDate}
                </p>
              </div>

              <button className="support-btn" onClick={() => navigate('/donate')}>Support This Project</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export const ActiveProjects = () => {
  const { projects } = useData();
  const navigate = useNavigate();
  const activeProjects = projects.filter((p) => p.status === "Active");
  return (
    <div className="project-cards">
      {activeProjects.length === 0 ? (
        <h3>There are no Active projects</h3>
      ) : (
        activeProjects.map((p) => (
          <div key={p._id} className="project-card">
            <img className="project-image" src={p.image} alt={p.title} />

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
                <i className="bi bi-people"></i>
                <p>Impacted people: {p.peopleImpacted}</p>
              </div>

              <div className="date-info">
                <i className="bi bi-calendar-date"></i>
                <p className="project-date">
                  {p.startDate} – {p.endDate}
                </p>
              </div>

              <button className="support-btn" onClick={() => navigate('/donate')}>Support This Project</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
const ProgramsPage = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [peopleHelped, setPeopleHelped] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const { projects } = useData();

  useEffect(() => {
    if (projects.length > 0) {
      setTotalProjects(projects.length);
      setActiveProjects(projects.filter((p) => p.status === "Active").length);
      setCompletedProjects(
        projects.filter((p) => p.status === "Completed").length,
      );
      setPeopleHelped(projects.reduce((sum, p) => sum + p.peopleImpacted, 0));
      setTotalRaised(projects.reduce((sum, p) => sum + p.raisedAmount, 0));
    }
  }, [projects]);
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
          <p>{totalProjects}</p>
        </div>
        <div className="summary-box">
          <h4>Active</h4>
          <p>{activeProjects}</p>
        </div>
        <div className="summary-box">
          <h4>Completed</h4>
          <p>{completedProjects}</p>
        </div>
        <div className="summary-box">
          <h4>People Helped</h4>
          <p>{peopleHelped.toLocaleString()}</p>
        </div>
        <div className="summary-box">
          <h4>Total Raised</h4>
          <p>${totalRaised.toLocaleString()}</p>
        </div>
      </div>

      <nav className="programs-filter">
        <NavLink className="filter-link" to="project">
          All Projects
        </NavLink>
        <NavLink className="filter-link" to="active">
          Active
        </NavLink>
        <NavLink className="filter-link" to="complete">
          Completed
        </NavLink>
      </nav>

      <Outlet />
      <Footer />
    </div>
  );
};

export default ProgramsPage;