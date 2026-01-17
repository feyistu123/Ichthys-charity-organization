const volunteerController = require("../controller/volunteerController");
const { verifyAdmin, verifyToken } = require("../middleware/authMiddleware");

const handleVolunteerRoutes = (req, res) => {
  // POST VOLUNTEER APPLICATION (Public)
  if (req.url === "/api/volunteers/signup" && req.method === "POST") {
    volunteerController.submitApplication(req, res);
    return true;
  }

  // FIX: Added verifyToken here so req.user is defined
  if (req.url === "/api/volunteers/dashboard" && req.method === "GET") {
    verifyToken(req, res, () => {
      volunteerController.handleGetDashboard(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Get list of people waiting for approval
  if (req.url === "/api/volunteers/pending" && req.method === "GET") {
    verifyAdmin(req, res, () => {
      volunteerController.handleGetPending(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Get all volunteers
  if (req.url === "/api/volunteers/all" && req.method === "GET") {
    verifyAdmin(req, res, () => {
      volunteerController.handleGetAllVolunteers(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Approve or Reject a volunteer
  if (req.url.startsWith("/api/admin/approve/") && req.method === "PATCH") {
    verifyAdmin(req, res, () => {
      volunteerController.handleApproveVolunteer(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Send announcement to all volunteers
  if (req.url === "/api/volunteers/announcement" && req.method === "POST") {
    verifyAdmin(req, res, () => {
      volunteerController.sendAnnouncement(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Send message to specific volunteer
  if (req.url.startsWith("/api/volunteers/message/") && req.method === "POST") {
    verifyAdmin(req, res, () => {
      volunteerController.sendMessage(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Assign project to volunteer
  if (req.url.startsWith("/api/volunteers/assign/") && req.method === "POST") {
    verifyAdmin(req, res, () => {
      volunteerController.assignProject(req, res);
    });
    return true;
  }

  // Get volunteer dashboard data (tasks and announcements)
  if (req.url.startsWith("/api/volunteers/dashboard/") && req.method === "GET") {
    verifyToken(req, res, () => {
      volunteerController.getVolunteerDashboard(req, res);
    });
    return true;
  }

  // Submit volunteer report
  if (req.url.startsWith("/api/volunteers/report/") && req.method === "POST") {
    verifyToken(req, res, () => {
      volunteerController.submitReport(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Get all reports
  if (req.url === "/api/volunteers/reports" && req.method === "GET") {
    verifyAdmin(req, res, () => {
      volunteerController.getAllReports(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Get all announcements and assignments
  if (req.url === "/api/volunteers/announcements-assignments" && req.method === "GET") {
    verifyAdmin(req, res, () => {
      volunteerController.getAllAnnouncementsAssignments(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Edit announcement or assignment
  if (req.url.startsWith("/api/volunteers/edit/") && req.method === "PUT") {
    verifyAdmin(req, res, () => {
      volunteerController.editAnnouncementAssignment(req, res);
    });
    return true;
  }

  // ADMIN ONLY: Delete announcement or assignment
  if (req.url.startsWith("/api/volunteers/delete/") && req.method === "DELETE") {
    verifyAdmin(req, res, () => {
      volunteerController.deleteAnnouncementAssignment(req, res);
    });
    return true;
  }
  return false;
};

module.exports = handleVolunteerRoutes;
