import React, { useState } from "react";
import "./Signuppage.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signuppage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("contact", formData.contact);

    if (formData.thumbnail) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/sign-up",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("sign up successfully!", response.data);
      alert("sign up successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error in sign up:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              // value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              // value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              // value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              name="contact"
              // value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="thumbnail">Profile:</label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submitbtn">
            Sign Up
          </button>
          <div className="account">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signuppage;
