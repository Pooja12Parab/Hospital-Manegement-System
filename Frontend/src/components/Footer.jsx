import React from "react";
import "./Footer.css";
import {
  FaHospital,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mainfooter">
      <div className="footer-section">
        <h1>ABOUT US</h1>
        <p>
          Hospital Plus is a state-of-the-art healthcare facility dedicated to
          providing top-notch medical care. Our team of experienced doctors and
          healthcare professionals are committed to patient well-being.
        </p>
      </div>

      <div className="footer-section">
        <h1>QUICK LINKS</h1>
        <ul>
          <li>
            <NavLink to="/Doctors" className="nav-link">🩺 Our Doctors</NavLink>
          </li>
          <li>
            <NavLink to="/" className="nav-link">📅 Book an Appointment</NavLink>
          </li>
          <li>
            <NavLink to="/Departments" className="nav-link">💊 Departments</NavLink>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h1>CONTACT US</h1>
        <ul>
          <li>
            <FaMapMarkerAlt style={{ marginRight: "10px" }} /> Mumbai, India
          </li>
          <li>
            <FaPhone style={{ marginRight: "10px" }} /> +91 98765 43210
          </li>
          <li>
            <FaEnvelope style={{ marginRight: "10px" }} /> info@hospitalplus.com
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
