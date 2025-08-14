import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", formData);
      console.log(response);

      if (response.data.success) {
        alert("Login successful!");
        const { data, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("admin", JSON.stringify(data));

        navigate("/admin"); 
      } else {
        alert("Login failed! Please check your credentials.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Login error! Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="submitbtn">Login</button>
          <div className="account">
            Don't have an account? <NavLink to="/signUp">Sign up</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
