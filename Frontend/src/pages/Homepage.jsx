import React from "react";
import Homeslider from "../components/Homeslider";
import Appointmentsection from "../components/Appointmentsection";
import Homesec from "../components/homesec";
import OurDoctors from "../components/OurDoctors.jsx";
import Department from "../components/Department.jsx";

const Homepage = () => {
  return (
    <div>
      <Homeslider />
      <Appointmentsection />
      <Homesec />
      <OurDoctors />
      <Department />
    </div>
  );
};

export default Homepage;
