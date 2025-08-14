import React from "react";
import Department from "../components/Department.jsx";

import "./Doctorpage.css";

const Departmentpage = () => {
  return (
    <div className="depcontainer">
      <div className="headerimg">
        <div className="dpage">DEPARTMENT</div>
      </div>
      <Department />
    </div>
  );
};

export default Departmentpage;
