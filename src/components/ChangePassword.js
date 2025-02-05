import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../api/axiosInstance"; // Adjust the path to your Axios instance file
import checkAuth from "../auth/checkAuth";
import "../changepassword.css";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(null);

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await axios.patch("/user/changePassword", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      if (response.data.success) {
        setMessage("Password updated successfully. You will be logged out shortly.");
        setSuccess(true);

        // Logout and navigate to login after a short delay
        setTimeout(() => {
          localStorage.removeItem("token"); // Clear the authentication token
          navigate("/login"); // Navigate to the login page
        }, 2000); // 2 seconds delay
      } else {
        setMessage(response.data.message);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSuccess(false);
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h2 className="change-password-title">Change Password</h2>
        {message && (
          <div
            className={`alert ${success ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              className="form-control"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default checkAuth(ChangePassword);