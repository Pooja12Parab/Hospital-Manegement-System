import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import logo from "../assets/Homepage - Hospital Plus/logo.png";
import { Navitem } from "./Navitems"; // Removed DepartmentDropdown since it's now fetched from API
import "./Navbar.css";
import { useQuery } from "react-query";
import axios from "axios";

const Navbar = () => {
  
  const {
    isLoading: isDoctorsLoading,
    error: doctorsError,
    data: doctorsData,
  } = useQuery("doctorsData", async () => {
    const response = await axios.get("http://localhost:8000/get-doctors");
    return response.data;
  });

  const {
    isLoading: isDepartmentsLoading,
    error: departmentsError,
    data: departmentsData,
  } = useQuery("departmentsData", async () => {
    const response = await axios.get("http://localhost:8000/get-departments");
    return response.data?.data;
  });

  // console.log(doctorsData, departmentsData);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (menu) =>
    setDropdownOpen(dropdownOpen === menu ? null : menu);

  if (isDoctorsLoading || isDepartmentsLoading) return <p>Loading...</p>;
  if (doctorsError || departmentsError)
    return <p>Error: {doctorsError?.message || departmentsError?.message}</p>;

  return (
    <header className="header">
      <nav className="Navbar">
        <div className="logo">
          <NavLink to={"/"}>
            <img src={logo} alt="Hospital Logo" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <ul className={`Navitem ${menuOpen ? "open" : ""}`}>
          {Navitem.map((item, id) => (
            <li
              className="List-items"
              key={id}
              onMouseEnter={() => toggleDropdown(item.title)}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <NavLink to={item.path}>{item.title}</NavLink>

              {/* Doctors Dropdown (API Data) */}

              {/* New Doctor */}
              {item.title === "Doctors" && departmentsData && (
                <ul
                  className={`dropdown ${
                    dropdownOpen === "Departments" ? "active" : ""
                  }`}
                >
                  {departmentsData.map((department, depId) => (
                    <li key={depId} className="ditem-list">
                      <NavLink to={`/Departments/${department.DepartmentName}`}>
                        {department.DepartmentName}
                      </NavLink>

                      {doctorsData && Array.isArray(doctorsData.data) && (
                        <ul className="sub-dropdown">
                          {doctorsData.data
                            .filter(
                              (d) =>
                                d.DepartmentName?.DepartmentName ==
                                department.DepartmentName
                            )
                            .map((sub, subid) => (
                              <li key={subid} className="sub-ditemlist">
                                <NavLink to={`/Doctors/${sub.DoctorName}`}>
                                  {sub.DoctorName}
                                </NavLink>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {/* Departments Dropdown (API Data) */}
              {item.title === "Departments" && departmentsData && (
                <ul
                  className={`dropdown ${
                    dropdownOpen === "Departments" ? "active" : ""
                  }`}
                >
                  {departmentsData.map((department, depId) => (
                    <li key={depId} className="ditem-list">
                      <NavLink to={`/Departments/${department.DepartmentName}`}>
                        {department.DepartmentName}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="menubar" onClick={toggleMenu}>
          {menuOpen ? <IoMdClose /> : <IoMdMenu style={{ fontSize: "35px" }} />}
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Navbar;
