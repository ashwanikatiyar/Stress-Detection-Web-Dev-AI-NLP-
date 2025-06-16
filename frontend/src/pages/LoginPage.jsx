// src/pages/LoginPage.jsx


import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginParallax from "../components/LoginParallax";
import "../styles/common.css";
import { loginUser , API_URL } from "../utils/api";
import { AuthContext } from "../context/AuthContext";



const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Debug form data
    try {
      const response = await loginUser(formData);
      console.log("API Response:", response); // Debug API response
      if (response.token) {
        login(response.user, response.token);
        alert("Login Successful!");
        navigate("/home");
      } else {
        alert(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error); // Debug API error
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <LoginParallax />
      <div className={`genie-effect ${isVisible ? "active" : ""}`}>
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <div className="input__container">
            
            <input
              type="email"
              id="email"
              name="email"
              className="input__search"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__container">
            
            <input
              type="password"
              id="password"
              name="password"
              className="input__search"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__container">
            <button type="submit" className="input__button__shadow">
              Login
            </button>
          </div>
        </form>

        <p>
          New User? <Link to="/signup">Sign Up Here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;



