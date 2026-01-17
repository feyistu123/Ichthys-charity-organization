const projectController = require("../controller/projectController");
const { verifyAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const handleProgramRoutes = (req, res) => {
  // 1. GET ALL PROGRAMS (Public)
  if (req.url === "/api/programs" && req.method === "GET") {
    projectController.getProjects(req, res);
    return true;
  }

  // 2. POST NEW PROGRAM (Admin Only)
  if (req.url === "/api/programs/add" && req.method === "POST") {
    verifyAdmin(req, res, () => projectController.addProject(req, res));
    return true;
  }

  if (req.url === "/api/programs/upload" && req.method === "POST") {
    verifyAdmin(req, res, () => {
      upload(req, res, (err) => {
        if (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: err.message }));
        }
        projectController.createProjectWithImage(req, res);
      });
    });
    return true;
  }

  // 3. PATCH STATUS (Admin Only)
  if (req.url.startsWith("/api/programs/status/") && req.method === "PATCH") {
    const id = req.url.split("/").pop();
    verifyAdmin(req, res, () => projectController.changeStatus(req, res, id));
    return true;
  }

  // 4. UPDATE PROJECT DETAILS (Admin Only)
  if (req.url.startsWith("/api/programs/") && req.method === "PATCH") {
    const id = req.url.split("/").pop();
    verifyAdmin(req, res, () => projectController.updateProject(req, res, id));
    return true;
  }

  // 5. DELETE PROJECT (Admin Only)
  if (req.url.startsWith("/api/programs/") && req.method === "DELETE") {
    const id = req.url.split("/").pop();
    verifyAdmin(req, res, () => projectController.removeProject(req, res, id));
    return true;
  }

  return false;
};

module.exports = handleProgramRoutes;
