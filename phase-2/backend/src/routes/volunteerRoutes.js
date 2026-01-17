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

  // ADMIN ONLY: Approve or Reject a volunteer
  if (req.url.startsWith("/api/admin/approve/") && req.method === "PATCH") {
    verifyAdmin(req, res, () => {
      volunteerController.handleApproveVolunteer(req, res);
    });
    return true;
  }
  return false;
};

module.exports = handleVolunteerRoutes;
