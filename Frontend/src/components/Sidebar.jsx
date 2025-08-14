import React from "react";
import "./AdminDashboard.css";
import logo from "../assets/Homepage - Hospital Plus/logo.png";

import { NavLink, useNavigate } from "react-router-dom";
import { FcDepartment } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";

const Sidebar = ({ children }) => {
  const routes = [
    {
      id: 1,
      url: "/admin",
      icon: <FcDepartment />,
      label: "Departments",
    },
    {
      id: 2,
      url: "/admin/doctors",
      icon: <FaUserDoctor />,
      label: "Doctors",
    },
    {
      id: 3,
      url: "/admin/appointment",
      icon: <RiCalendarScheduleFill />,
      label: "Appointment",
    },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="dash-container">
      <div className="dash-header">
        <img src={logo} alt="" />
        {/* <div className="searchbar">
          <input type="text" placeholder="search Something" />
          <CiSearch style={{ marginRight: 20 }} />
        </div> */}
        {/* <div className="profile">
          <div className="profile1">
            <h3>Profile </h3>
            <div className="profile-img">
              <CgProfile />
            </div>
          </div>
          <ul>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div> */}
      </div>

      <div className="sidebar">
        <div className="sidebar-1">
          <ul className="sidebar-2">
            {routes.map((route) => {
              return (
                <li key={route.id}>
                  <NavLink to={route.url}>
                    <span
                      style={{
                        backgroundColor: "white",
                        marginRight: "30px",
                        padding: "8px 12px",
                        borderRadius: "50%",
                        color: "blue",
                      }}
                    >
                      {route.icon}
                    </span>
                    {route.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-logout" onClick={handleLogout} style={{cursor:"pointer"}}>
          Logout
        </div>
      </div>

      <div className="main-content">{children}</div>
    </div>
  );
};

export default Sidebar;
