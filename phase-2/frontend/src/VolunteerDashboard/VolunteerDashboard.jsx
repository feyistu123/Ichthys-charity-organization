import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../volunteer.css";
export const TaskCard = () => {
  return (
    <div className="task-card">
      <div className="task-info">
        <h3 className="task-title">School Supply Distribution</h3>
        <p className="task-date">2025-01-15 10:00 AM</p>
        <p className="task-location">Community Center</p>
      </div>
      <p className="task-status">Scheduled</p>
    </div>
  );
};

const UpcomingTasks = () => {
  return (
    <div className="upcoming-tasks-container">
      <div className="tasks-section">
        <h3 className="section-title">Upcoming Tasks & Assignments</h3>
        <p className="section-subtitle">Your scheduled volunteer activities</p>
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>

      <div className="report-section">
        <h3 className="section-title">Submit Report</h3>
        <p className="section-subtitle">Report on your recent activities</p>
        <form className="report-form">
          <textarea
            placeholder="Describe your volunteer work, challenges faced, and outcomes achieved"
            className="report-textarea"
          ></textarea>
          <button type="submit" className="report-submit">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

const AnnouncementCard = () => {
  return (
    <div className="announcement-card">
      <h3 className="announcement-title">Volunteer Training Session</h3>
      <p className="announcement-text">
        Join us for our monthly training on January 20th. Topics include safety
        protocols and new program guidelines.
      </p>
      <p className="announcement-date">Posted 2 days ago</p>
    </div>
  );
};

const Announcement = () => {
  return (
    <div className="announcements">
      <h3 className="section-title">Announcements</h3>
      <AnnouncementCard />
    </div>
  );
};

const VolunteerDashboard = () => {
  return (
    <div className="volunteer-dashboard">
      <NavBar />
      <div className="volunt-intro">
        <h3 className="section-title">Volunteer Dashboard</h3>
        <p className="section-subtitle">Welcome back, Sarah Volunteer</p>
      </div>

      <div className="volunt-stats">
        <div className="stat-card">
          <h4 className="stat-title">Hours Contributed</h4>
          <p className="stat-subtitle">Total Volunteer hours</p>
          <p className="stat-value">0</p>
        </div>

        <div className="stat-card">
          <h4 className="stat-title">Tasks Completed</h4>
          <p className="stat-subtitle">Total completed tasks</p>
          <p className="stat-value">0</p>
        </div>

        <div className="stat-card">
          <h4 className="stat-title">Active Projects</h4>
          <p className="stat-subtitle">Currently assigned</p>
          <p className="stat-value">0</p>
        </div>

        <div className="stat-card">
          <h4 className="stat-title">Impact Level</h4>
          <p className="stat-subtitle">Recognition tier</p>
          <p className="stat-value">Gold</p>
        </div>
      </div>

      <UpcomingTasks />
      <Announcement />
      <Footer />
    </div>
  );
};

export default VolunteerDashboard;
