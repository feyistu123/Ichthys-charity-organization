const userLogic = require("../logic/userLogic");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const emailLogic = require("../logic/emailLogic");
const bcrypt = require("bcrypt");
// --- REGISTER CONTROLLER ---
exports.handleRegister = async (req, res) => {
  console.log("Registration request received");
  try {
    const user = await userLogic.registerUser(req.body);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message:
          user.role === "admin"
            ? "Admin account created!"
            : "Account created successfully!",
      }),
    );
  } catch (err) {
    console.error("Registration error:", err.message);
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
};

// --- LOGIN CONTROLLER ---
// src/controller/userController.js

exports.handleLogin = async (req, res) => {
  try {
    const user = await userLogic.loginUser(req.body);

    if (!user) {
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid email or password" }));
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Login successful!",
        token: token,
        user: {
          fullName: user.fullName,
          role: user.role,
          userType: user.userType,
          email: user.email,
        },
      }),
    );
  } catch (err) {
    if (err.message === "UNAPPROVED_VOLUNTEER") {
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Wait until the admin accepts you." }),
      );
    }
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Server Error" }));
  }
};

// --- STEP 1: FORGOT PASSWORD (Send Code) ---
exports.forgotPassword = async (req, res) => {
  const email = (req.body.email || "").toString().trim().toLowerCase();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User not found" }));
    }

    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    // Use field names from User schema
    user.resetCode = code;
    user.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await emailLogic.sendVerificationCode(email, code);
    console.log(`ForgotPassword: generated code ${code} for ${email}`);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Code sent successfully!" }));
  } catch (error) {
    console.error("ForgotPassword error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

// --- STEP 2: VERIFY CODE ---
exports.verifyResetCode = async (req, res) => {
  try {
    console.log("verifyResetCode req.body:", req.body);
    const email = (req.body.email || "").toString().trim().toLowerCase();
    const code = (req.body.code || "").toString().trim();
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`VerifyResetCode: user not found for ${email}`);
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User not found." }));
    }

    if (!user.resetCode) {
      console.log(`VerifyResetCode: no reset request for ${email}`);
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ error: "No reset request for this email." }),
      );
    }

    if (user.resetCode !== code) {
      console.log(
        `VerifyResetCode: code mismatch for ${email} (expected=${user.resetCode} got=${code})`,
      );
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Invalid code." }));
    }

    if (!user.resetCodeExpires || user.resetCodeExpires < Date.now()) {
      console.log(
        `VerifyResetCode: code expired for ${email} (expiry=${user.resetCodeExpires})`,
      );
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Code expired." }));
    }

    console.log(`VerifyResetCode: success for ${email}`);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Code verified. You may now reset your password.",
      }),
    );
  } catch (error) {
    console.error("VerifyResetCode error:", error);
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

// --- STEP 3: RESET PASSWORD ---
exports.resetPassword = async (req, res) => {
  const email = (req.body.email || "").toString().trim().toLowerCase();
  const code = (req.body.code || "").toString().trim();
  const newPassword = req.body.newPassword;
  try {
    console.log(
      "resetPassword req.body:",
      req.body && { email: req.body.email, code: req.body.code },
    );
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`ResetPassword: user not found for ${email}`);
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User not found." }));
    }

    if (!user.resetCode) {
      console.log(`ResetPassword: no reset request for ${email}`);
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ error: "No reset request for this email." }),
      );
    }

    if (user.resetCode !== code) {
      console.log(
        `ResetPassword: code mismatch for ${email} (expected=${user.resetCode} got=${code})`,
      );
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Invalid code." }));
    }

    if (!user.resetCodeExpires || user.resetCodeExpires < Date.now()) {
      console.log(
        `ResetPassword: code expired for ${email} (expiry=${user.resetCodeExpires})`,
      );
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Code expired." }));
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    // Update fields and clear the reset data for security
    user.password = hashed;
    user.resetCode = null;
    user.resetCodeExpires = null;
    await user.save();

    console.log(`ResetPassword: password updated for ${email}`);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Password has been reset successfully. You can now login.",
      }),
    );
  } catch (error) {
    console.error("ResetPassword error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};
