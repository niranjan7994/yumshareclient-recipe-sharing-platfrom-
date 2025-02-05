import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <div className="container">
        {/* Brand Logo */}
        <a className="navbar-brand" href="/">
          <span style={{ color: "#FFA500", fontWeight: "bold" }}>Yum</span>
          <span style={{ color: "#000000" }}>Share</span>
        </a>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  window.location.pathname === "/home" ? "active-link" : ""
                }`}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  window.location.pathname === "/myprofile" ? "active-link" : ""
                }`}
                to="/myprofile"
              >
                My Profile
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn logout-btn"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
