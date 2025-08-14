import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import "../components/OurDoctors.css";
import "./Doctorpage.css";

const Doctorpage = () => {
  const [selectedDept, setSelectedDept] = useState("All");
   const [filepath, setFilepath] = React.useState("");

  // Fetch doctors data
  const { isLoading, error, data } = useQuery("doctors", async () => {
    const response = await axios.get("http://localhost:8000/get-doctors");
    setFilepath(response.data.filepath);
    return response.data?.data || [];
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading doctors: {error.message}</p>;

  // console.log("API Response:", data);



  const allDoctors = data.map(({ DepartmentName, ...details }) => ({
    ...details,
    DepartmentName: DepartmentName?.DepartmentName,
  }));

  console.log("Doctors:", allDoctors);

  // Filter departments, removing duplicates
  const data1 = allDoctors.map((dept) => dept.DepartmentName);
  const cat = data1.filter((a, i) => data1.indexOf(a) === i);
  const departments = ["All", ...cat];
  const uniqueDepartments = departments.filter(
    (item, index) => departments.indexOf(item) === index
  );

  // Filter doctors based on selected department
  const filteredDoctors =
    selectedDept === "All"
      ? allDoctors
      : allDoctors.filter((doctor) => doctor.DepartmentName === selectedDept);

  console.log("Filtered Doctors:", filteredDoctors);

  return (
    <div className="all-doctor">
      <div className="headerimg">
        <div className="dpage">DOCTORS</div>
      </div>

      {/* Department List */}
      <ul className="dep-list">
        {uniqueDepartments.map((dept, index) => (
          <li key={index} onClick={() => setSelectedDept(dept)}>
            {dept}
          </li>
        ))}
      </ul>

      {/* Doctor Cards */}
      <div className="doctor-container">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <div className="doctor-card" key={index}>
              <img src={filepath + "/" + doctor.thumbnail} alt="" />

              <h4>
                <NavLink to={`/Doctors/${doctor.DoctorName}`}>
                  {doctor.DoctorName}
                </NavLink>
              </h4>
              <h5>{doctor.DepartmentName}</h5>
              <p>{doctor.description}</p>
            </div>
          ))
        ) : (
          <p>No doctors available.</p>
        )}
      </div>
    </div>
  );
};

export default Doctorpage;
