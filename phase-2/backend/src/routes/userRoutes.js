const userController = require("../controller/userController");

const handleUserRoutes = async (req, res) => {
  // POST /api/users/register
  if (req.url === "/api/users/register" && req.method === "POST") {
    userController.handleRegister(req, res);
    return true;
  }
  // POST /api/login
  if (req.url === "/api/users/login" && req.method === "POST") {
    userController.handleLogin(req, res);
    return true;
  }

  // --- FORGOT PASSWORD ROUTES ---

  // STEP 1: Request 4-digit code
  if (req.url === "/api/users/forgot-password" && req.method === "POST") {
    userController.forgotPassword(req, res);
    return true;
  }

  // STEP 2: Verify the 4-digit code
  if (req.url === "/api/users/verify-code" && req.method === "POST") {
    userController.verifyResetCode(req, res);
    return true;
  }

  // STEP 3: Submit new password with the code
  if (req.url === "/api/users/reset-password" && req.method === "POST") {
    userController.resetPassword(req, res);
    return true;
  }

  // Default: Route not found for /api/auth
  if (req.url.startsWith("/api/users")) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Auth route not found" }));
    return true;
  }

  return false;
};

module.exports = handleUserRoutes;
