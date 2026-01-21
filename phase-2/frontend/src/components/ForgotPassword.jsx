import React, { useState } from 'react';
import { useUserData } from '../context/UserContext';

const ForgotPassword = ({ onClose, onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { forgotPassword, verifyResetCode, resetPassword } = useUserData();

  const handleSendCode = async (e) => {
    e.preventDefault();
    const success = await forgotPassword(email);
    if (success) setStep(2);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const success = await verifyResetCode(email, code);
    if (success) setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const success = await resetPassword(email, code, newPassword);
    if (success) {
      onClose();
      onBackToLogin();
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      
      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Code</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <p>Enter the 4-digit code sent to {email}</p>
          <input
            type="text"
            placeholder="Enter 4-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="4"
            required
          />
          <button type="submit">Verify Code</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}

      <button onClick={onBackToLogin} className="back-btn">
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;