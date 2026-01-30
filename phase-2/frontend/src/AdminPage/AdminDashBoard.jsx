import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../adminPage.css";
import { api } from "../axios/api";
const AdminDashBoard = () => {
  const [totalRaised, setTotalRaised] = useState(135000);
  const [monthlyRaised, setMonthlyRaised] = useState(12500);
  const [totalDonors, setTotalDonors] = useState(245);
  const [volunteers, setVolunteers] = useState(18);
  const [activeProjects, setActiveProjects] = useState(3);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        const data = res.data || {};
        setTotalRaised(data.totalRaised ?? totalRaised);
        setMonthlyRaised(data.monthlyRaised ?? monthlyRaised);
        setTotalDonors(data.totalDonors ?? totalDonors);
        setVolunteers(data.volunteers ?? volunteers);
        setActiveProjects(data.activeProjects ?? activeProjects);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      }
    };
    fetchStats();
  }, []);

  const [latestDonation, setLatestDonation] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchLatest = async () => {
      try {
        const res = await api.get("/donations/latest");
        if (!mounted) return;
        setLatestDonation(res.data || null);
      } catch (err) {
        console.error("Failed to fetch latest donation:", err);
      }
    };
    fetchLatest();
    const id = setInterval(fetchLatest, 30000); // poll every 30s
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const timeAgo = (dateStr) => {
    if (!dateStr) return "just now";
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d.getTime()) / 60000); // minutes
    if (diff < 1) return "just now";
    if (diff === 1) return "1 minute ago";
    return `${diff} minutes ago`;
  };

  return (
    <div className="admin-dashboard">
      <NavBar />

      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h4 className="stat-icon">💲</h4>
          <p className="stat-value">${totalRaised.toLocaleString()}</p>
          <h4 className="stat-label">Total Raised</h4>
        </div>

        <div className="stat-card">
          <h4 className="stat-icon">💰</h4>
          <p className="stat-value">${monthlyRaised.toLocaleString()}</p>
          <h4 className="stat-label">Monthly Raised</h4>
        </div>

        <div className="stat-card">
          <h4 className="stat-icon">👥</h4>
          <p className="stat-value">{totalDonors}</p>
          <h4 className="stat-label">Total Donors</h4>
        </div>

        <div className="stat-card">
          <h4 className="stat-icon">🙋♂️</h4>
          <p className="stat-value">{volunteers}</p>
          <h4 className="stat-label">Volunteers</h4>
        </div>

        <div className="stat-card">
          <h4 className="stat-icon">📁</h4>
          <p className="stat-value">{activeProjects}</p>
          <h4 className="stat-label">Active Projects</h4>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h3>Recent Activity</h3>
        <p className="activity-subtitle">Latest updates across the platform</p>

        <div className="activity-item">
          <h4 className="stat-icon">🙋♂️</h4>
          <div>
            {latestDonation ? (
              <>
                <h4>
                  {latestDonation.donorName ||
                    latestDonation.donorEmail ||
                    "Someone"}{" "}
                  donated ${latestDonation.amount}
                </h4>
                <p>{timeAgo(latestDonation.donationDate)}</p>
              </>
            ) : (
              <>
                <h4>No recent donations</h4>
                <p>—</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>

        <nav className="quick-actions-nav">
          <NavLink
            to="projects"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Projects
          </NavLink>
          <NavLink
            to="events"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Events
          </NavLink>
          <NavLink
            to="posts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Blog Posts
          </NavLink>
          <NavLink
            to="volunteer-approval"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Volunteer
          </NavLink>
          <NavLink
            to="donation-management"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Donation Management
          </NavLink>
        </nav>

        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashBoard;
