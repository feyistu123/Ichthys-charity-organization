import React, { useState, useEffect } from "react";
import { useUserData } from "../context/UserContext";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../volunteer.css";

export const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <div className="task-info">
        <h3 className="task-title">{task.projectTitle || task.message}</h3>
        <p className="task-date">{new Date(task.createdAt).toLocaleDateString()}</p>
        <p className="task-type">{task.type === 'task' ? 'Task Assignment' : 'Message'}</p>
      </div>
      <p className="task-status">{task.type === 'task' ? 'Assigned' : 'Received'}</p>
    </div>
  );
};

const UpcomingTasks = ({ tasks, onSubmitReport }) => {
  const [report, setReport] = useState("");
  const taskAssignments = tasks.filter(item => item.type === 'task');
  
  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!report.trim()) return;
    onSubmitReport(report);
    setReport("");
  };
  
  return (
    <div className="upcoming-tasks-container">
      <div className="tasks-section">
        <h3 className="section-title">Upcoming Tasks & Assignments</h3>
        <p className="section-subtitle">Your scheduled volunteer activities</p>
        {taskAssignments.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          taskAssignments.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))
        )}
      </div>

      <div className="report-section">
        <h3 className="section-title">Submit Report</h3>
        <p className="section-subtitle">Report on your recent activities</p>
        <form className="report-form" onSubmit={handleSubmitReport}>
          <textarea
            placeholder="Describe your volunteer work, challenges faced, and outcomes achieved"
            className="report-textarea"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="report-submit">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

const AnnouncementCard = ({ announcement }) => {
  return (
    <div className="announcement-card">
      <h3 className="announcement-title">
        {announcement.type === 'announcement' ? 'General Announcement' : 'Personal Message'}
      </h3>
      <p className="announcement-text">{announcement.message}</p>
      <p className="announcement-date">
        Posted {new Date(announcement.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

const Announcement = ({ announcements }) => {
  return (
    <div className="announcements">
      <h3 className="section-title">Announcements & Messages</h3>
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        announcements.map((announcement) => (
          <AnnouncementCard key={announcement._id} announcement={announcement} />
        ))
      )}
    </div>
  );
};

const VolunteerDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getVolunteerDashboard, submitReport } = useUserData();

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Get volunteer ID from localStorage or context
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode token to get volunteer ID (simplified approach)
          const payload = JSON.parse(atob(token.split('.')[1]));
          const data = await getVolunteerDashboard(payload.id);
          setDashboardData(data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, [getVolunteerDashboard]);

  const handleSubmitReport = async (reportText) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        await submitReport(payload.id, reportText);
      } catch (error) {
        console.error('Error submitting report:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const tasks = dashboardData.filter(item => item.type === 'task');
  const announcements = dashboardData;

  return (
    <div className="volunteer-dashboard">
      <NavBar />
      <div className="volunt-intro">
        <h3 className="section-title">Volunteer Dashboard</h3>
        <p className="section-subtitle">Welcome back!</p>
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
          <p className="stat-value">{tasks.length}</p>
        </div>

        <div className="stat-card">
          <h4 className="stat-title">Impact Level</h4>
          <p className="stat-subtitle">Recognition tier</p>
          <p className="stat-value">Gold</p>
        </div>
      </div>

      <UpcomingTasks tasks={dashboardData} onSubmitReport={handleSubmitReport} />
      <Announcement announcements={announcements} />
      <Footer />
    </div>
  );
};

export default VolunteerDashboard;
