import React, { useState } from "react";
import { useUserData } from "../context/UserContext";

const ForgotPassword = ({ onClose, onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { forgotPassword, verifyResetCode, resetPassword } = useUserData();

  const handleSendCode = async (e) => {
    e.preventDefault();
    const trimmed = (email || "").trim().toLowerCase();
    const success = await forgotPassword(trimmed);
    if (success) setStep(2);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedCode = (code || "").trim();
    const success = await verifyResetCode(trimmedEmail, trimmedCode);
    if (success) setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedCode = (code || "").trim();
    const success = await resetPassword(trimmedEmail, trimmedCode, newPassword);
    if (success) {
      onClose();
      onBackToLogin();
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="login-title">Reset Your Password</h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
        {step === 1 && "Enter your email to receive a reset code"}
        {step === 2 && "Check your email for the verification code"}
        {step === 3 && "Create your new password"}
      </p>

      {step === 1 && (
        <form className="login-form" onSubmit={handleSendCode}>
          <label className="login-label">Email Address</label>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">
            Send Reset Code
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="login-form" onSubmit={handleVerifyCode}>
          <p
            style={{
              color: "#2563eb",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Code sent to: <strong>{email}</strong>
          </p>
          <label className="login-label">Verification Code</label>
          <input
            className="login-input"
            type="text"
            placeholder="Enter 4-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="4"
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              letterSpacing: "0.5rem",
            }}
            required
          />
          <button className="login-btn" type="submit">
            Verify Code
          </button>
        </form>
      )}

      {step === 3 && (
        <form className="login-form" onSubmit={handleResetPassword}>
          <label className="login-label">New Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label className="login-label">Confirm Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">
            Reset Password
          </button>
        </form>
      )}

      <div className="forgot-password-link">
        <span className="link-text" onClick={onBackToLogin}>
          ← Back to Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
