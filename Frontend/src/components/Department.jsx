
import React from "react";
// import { Departments } from "./Department.js";
import { useQuery } from "react-query";
import "./Department.css";
import axios from "axios";
import { Link } from "react-router-dom";


const Department = () => {
  const [filepath, setFilepath] = React.useState("");
  const { isLoading, error, data } = useQuery("repoData", async () => {
    const user = await axios.get("http://localhost:8000/get-departments");
    setFilepath(user.data.filepath);
    return user.data?.data;
  });

  if (isLoading) return "Loading...";
  if (error) return "an error has occured" + error.message;
  return (
    <div className="department">
      <>
        <div className="department1">
          <h1>HOSPITAL DEPARTMENTS</h1>
          <hr />
        </div>

        <div className="department-card">
          {data.map((department, index) => (
            <div className="card" key={index}>
              <img
                src={filepath + "/" + department.thumbnail}
                alt={department.DepartmentName}
              />
              <h1>
                <Link to={"/Departments/" + department.DepartmentName}>
                  {department.DepartmentName}
                </Link>
              </h1>
              <p>{department.Description}</p>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Department;
