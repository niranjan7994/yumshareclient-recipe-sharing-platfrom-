import React from "react";
import { Link } from "react-router-dom"; // For navigation
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ backgroundColor: "black", color: "white", height: "100vh" }}
    >
      {/* Welcome Message */}
      <h1 className="display-4 text-warning mb-3">Welcome to YumShare</h1>

      {/* Catchphrase */}
      <p className="lead text-white mb-4">
        "Unite Over Food, Connect Through Flavors"
      </p>

      {/* Transparent Login Button */}
      <Link
        to="/login"
        className="btn btn-outline-warning btn-lg"
        style={{ borderRadius: "25px" }}
      >
        Get Started 
      </Link>
    </div>
  );
}

export default App;
