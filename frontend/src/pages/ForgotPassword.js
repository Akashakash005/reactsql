import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1 for email input, 2 for OTP and new password

  const navigate = useNavigate(); // Initialize navigate function

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/forgot-password`, // Update this line
        { email }
      );
      setMessage(response.data.message);
      setStep(2); // Move to the OTP and new password step
    } catch (error) {
      setMessage("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/verify-otp`, // New endpoint for OTP verification
        { otp, email } // Send the OTP and email for verification
      );

      if (response.data.success) {
        setMessage("OTP verified. You can now reset your password.");
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to verify OTP.");
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password`, // Update this line
        {
          otp,
          newPassword,
          email,
        }
      );
      setMessage(response.data.message);
      alert("Password changed successfully !");
      // Navigate to /login after successful reset
      navigate("/login");
    } catch (error) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <main>
      <div className="login-container">
        <h2>Reset Password</h2>
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="login-form">
            <div className="form-group">
              <label>Enter your email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Send OTP</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="login-form">
            <div className="otp">
              <input
                type="text"
                value={otp}
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="button" onClick={handleVerifyOtp}>
                Verify
              </button>
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Reset Password</button>
            </div>
          </form>
        )}
        {message && <p style={{ color: "black" }}>{message}</p>}
      </div>
    </main>
  );
};

export default ForgotPassword;
