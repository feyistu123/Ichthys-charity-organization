import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../axios/api";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  // Fetch all volunteers for admin
  const fetchAllVolunteers = async () => {
    try {
      console.log("Fetching all volunteers...");
      const res = await api.get("/volunteers/all");
      console.log("Volunteers fetched:", res.data);
      setVolunteers(res.data);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
      console.error("Error response:", err.response?.data);
      alert(err.response?.data?.error || "Failed to fetch volunteers");
    }
  };

  // Fetch pending volunteers for admin
  const fetchPendingVolunteers = async () => {
    try {
      const res = await api.get("/volunteers/pending");
      setVolunteers(res.data);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
    }
  };

  // Approve volunteer
  const approveVolunteer = async (volunteerId) => {
    try {
      const res = await api.patch(`/admin/approve/${volunteerId}`);
      alert(res.data.message);
      fetchAllVolunteers(); // Refresh list to show updated status
    } catch (err) {
      console.error("Error approving volunteer:", err);
      alert(err.response?.data?.error || "Failed to approve volunteer");
    }
  };

  // Send announcement to all volunteers
  const sendAnnouncement = async (message) => {
    try {
      const res = await api.post("/volunteers/announcement", { message });
      alert(res.data.message);
    } catch (err) {
      console.error("Error sending announcement:", err);
      alert(err.response?.data?.error || "Failed to send announcement");
    }
  };

  // Send message to specific volunteer
  const sendMessage = async (volunteerId, message) => {
    try {
      const res = await api.post(`/volunteers/message/${volunteerId}`, {
        message,
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error sending message:", err);
      alert(err.response?.data?.error || "Failed to send message");
    }
  };

  // Assign project to volunteer
  const assignProject = async (volunteerId, projectTitle) => {
    try {
      const res = await api.post(`/volunteers/assign/${volunteerId}`, {
        projectTitle,
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error assigning project:", err);
      alert(err.response?.data?.error || "Failed to assign project");
    }
  };

  // Get volunteer dashboard data
  const getVolunteerDashboard = async (volunteerId) => {
    try {
      console.log("Fetching dashboard for volunteer:", volunteerId);
      const res = await api.get(`/volunteers/dashboard/${volunteerId}`);
      console.log("Dashboard data received:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      return [];
    }
  };

  // Submit volunteer report
  const submitReport = async (userId, report) => {
    try {
      const res = await api.post(`/volunteers/report/${userId}`, { report });
      alert(res.data.message);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert(err.response?.data?.error || "Failed to submit report");
    }
  };

  // Get all reports for admin
  const getAllReports = async () => {
    try {
      const res = await api.get("/volunteers/reports");
      return res.data;
    } catch (err) {
      console.error("Error fetching reports:", err);
      return [];
    }
  };

  // Get all announcements and assignments for admin
  const getAllAnnouncementsAssignments = async () => {
    try {
      const res = await api.get("/volunteers/announcements-assignments");
      return res.data;
    } catch (err) {
      console.error("Error fetching announcements:", err);
      return [];
    }
  };

  // Edit announcement or assignment
  const editAnnouncementAssignment = async (itemId, message, projectTitle) => {
    try {
      const res = await api.put(`/volunteers/edit/${itemId}`, {
        message,
        projectTitle,
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error editing item:", err);
      alert(err.response?.data?.error || "Failed to edit item");
    }
  };

  // Delete announcement or assignment
  const deleteAnnouncementAssignment = async (itemId) => {
    try {
      const res = await api.delete(`/volunteers/delete/${itemId}`);
      alert(res.data.message);
    } catch (err) {
      console.error("Error deleting item:", err);
      alert(err.response?.data?.error || "Failed to delete item");
    }
  };

  const RegisterUser = async (newUser) => {
    try {
      const res = await api.post("/users/register", newUser);
      const data = res.data;
      alert(data.message);
    } catch (err) {
      console.error("Registration error:", err);
      if (err.code === "ERR_NETWORK") {
        alert(
          "Cannot connect to server. Make sure the backend is running on port 5000.",
        );
      } else {
        const message = err.response?.data?.error || "Registration failed";
        alert(message);
      }
    }
  };

  const loginUser = async (user) => {
    try {
      const res = await api.post("/users/login", user);
      const data = res.data;
      console.log("Login success:", data);
      alert(data.message || "Logged in successfully!");
      localStorage.setItem("token", data.token);
      return data.user;
    } catch (err) {
      console.error("Login error:", err);
      const message = err.response?.data?.message || "Login failed";
      alert(message);

      return null;
    }
  };

  const signUpVolunteer = async (newVolunteer) => {
    try {
      const res = await api.post("/volunteers/signup", newVolunteer);
      const data = res.data;
      alert(data.message);
    } catch (err) {
      console.error("Volunteer signup error:", err);
      const message = err.response?.data?.error || "Signup failed";
      alert(message);
    }
  };
  const sendFeedBack = async (newFeedBack) => {
    try {
      await api.post("/contact", newFeedBack);
      alert("Feedback sent successfully!");
    } catch (err) {
      console.error("Error sending feedback:", err);
      alert("Failed to send feedback. Please try again.");
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await api.post("/users/forgot-password", { email });
      alert(res.data.message);
      return true;
    } catch (err) {
      console.error("Forgot password error:", err);
      alert(err.response?.data?.error || "Failed to send reset code");
      return false;
    }
  };

  const verifyResetCode = async (email, code) => {
    try {
      const res = await api.post("/users/verify-code", { email, code });
      alert(res.data.message);
      return true;
    } catch (err) {
      console.error("Verify code error:", err);
      alert(err.response?.data?.error || "Invalid or expired code");
      return false;
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    try {
      const res = await api.post("/users/reset-password", {
        email,
        code,
        newPassword,
      });
      alert(res.data.message);
      return true;
    } catch (err) {
      console.error("Reset password error:", err);
      alert(err.response?.data?.error || "Failed to reset password");
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        RegisterUser,
        loginUser,
        signUpVolunteer,
        sendFeedBack,
        volunteers,
        fetchAllVolunteers,
        fetchPendingVolunteers,
        approveVolunteer,
        sendAnnouncement,
        sendMessage,
        assignProject,
        getVolunteerDashboard,
        submitReport,
        getAllReports,
        getAllAnnouncementsAssignments,
        editAnnouncementAssignment,
        deleteAnnouncementAssignment,
        forgotPassword,
        verifyResetCode,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserData = () => useContext(UserContext);
