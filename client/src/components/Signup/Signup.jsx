// import React, { useEffect } from "react";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import {toast , ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const Signup = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prevForm) => ({
      ...prevForm,
      [name]: value
    }));

  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(form.confirmPassword !== form.password) {
    toast.error("Passwords do not match!", {
      style: {
        background: "#f4c0b2",
        color: "black"
      }
    })
    return;
  }
    try {
      const response = await axios.post("http://localhost:4000/api/signup", form);
      console.log("Form data message etc : " , response.data);
      toast.success(response.data.message || "Signup successful!" , {
        style: {
          background: "#e2b714",
          color: "black"
        }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again." , {
        style: {
          background: "#f4c0b2",
          color: "black"
        }
      });
    }
    setform({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };
  return (
    <div className="signup-container">
      <div className="signup-register">
        <img src="/images/icons8-register-30.png" alt="" />
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={handleChange}
              value={form.username}
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
              value={form.email}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={form.password}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
              value={form.confirmPassword}
              required
            />
          </div>
          <div className="login-link-div">
            <Link to="/login" id="login-link">Already have an account? Login</Link>
          </div>
          <button type="submit">Signup</button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </div>
    </div>
  );
};

export default Signup;
