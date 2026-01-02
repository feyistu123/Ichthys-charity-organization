import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../adminPage.css";
const AdminDashBoard = () => {
  return (
    <div className="admin-dashboard">
      <NavBar />

      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h4 className="stat-icon">💲</h4>
          <p className="stat-value">$0</p>
          <h4 className="stat-label">Total Raised</h4>
        </div>

        <div className="stat-card">
          <h4 className="stat-icon">💰</h4>
          <p className="stat-value">$0</p>
          <h4 className="stat-label">Monthly Raised</h4>
        </div>

        <div className="stat-card">
          <h4 className="stat-icon">👥</h4>
          <p className="stat-value">0</p>
          <h4 className="stat-label">Total Donors</h4>
        </div>

        <div className="stat-card">
          <h4 className="stat-icon">🙋‍♂️</h4>
          <p className="stat-value">0</p>
          <h4 className="stat-label">Volunteers</h4>
        </div>

        <div className="stat-card">
          <h4 className="stat-icon">📁</h4>
          <p className="stat-value">0</p>
          <h4 className="stat-label">Active Projects</h4>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h3>Recent Activity</h3>
        <p className="activity-subtitle">Latest updates across the platform</p>

        <div className="activity-item">
          <h4 className="stat-icon">🙋‍♂️</h4>
          <div>
            <h4>New donation of $500 received</h4>
            <p>5 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>

        <nav className="quick-actions-nav">
          <Link to="projects">Projects</Link>
          <Link to="events">Events</Link>
          <Link to="posts">Blog Posts</Link>
          <Link to="volunteer-approval">Volunteer Approval</Link>
          <Link to="donation-management">Donation Management</Link>
        </nav>

        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashBoard;
