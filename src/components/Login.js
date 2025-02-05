import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import checkGuest from "../auth/checkGuest";
import "../login-signup.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage("");

      // Store JWT token in localStorage or sessionStorage
      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("name", response.data.name);
      // localStorage.setItem("email", response.data.email);

      // Redirect to another page (e.g., dashboard) after successful login
      navigate("/home");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong, please try again"
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card login-card">
              <div className="card-body">
                <h2 className="login-title">Log In</h2>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn login-btn">
                    Log In
                  </button>
                </form>
                <p className="text-center mt-3">
                  New user?{" "}
                  <Link to="/signup" className="login-link">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkGuest(Login);
