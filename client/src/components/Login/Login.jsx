import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        loginForm
      );
      const userId = response?.data?.user?.id;
      console.log("Saved userId to localStorage:", userId);

      if (userId) {
        localStorage.setItem("userId", userId);
        navigate("/dashboard");
      } else {
        console.error("Login succeeded but user ID missing.");
      }

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="signup-login">
        <img src="/images/icons8-login-48.png" alt="" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={loginForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
