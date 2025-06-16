// src/pages/SignupPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupParallax from "../components/SignupParallax";
import "../styles/common.css";
import { signupUser } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const SignupPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300); // Trigger animation
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Data:", formData); // Debugging log
    try {
      const response = await signupUser(formData);
      console.log("API Response:", response); // Debugging log
      if (response.token) {
        login(response.user, response.token);
        alert("Signup Successful!");
        navigate("/home");
      } else {
        alert(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error); // Debugging log
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <SignupParallax />
      <div className={`genie-effect ${isVisible ? "active" : ""}`}>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input__container">

            <input
              type="text"
              id="name"
              name="name"
              className="input__search"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input__search"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__container">
            <button type="submit" className="input__button__shadow">
              Register
            </button>
          </div>
        </form>

        <p>
          Existing User? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;



