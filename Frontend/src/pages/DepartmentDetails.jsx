import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const DepartmentDetails = () => {
  const { dept_name } = useParams();
  const [departments, setDepartments] = useState([]);
  const [filepath, setFilepath] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-departments");
        setDepartments(response.data?.data || []);
        setFilepath(response.data?.filepath || ""); 
        console.log(response)
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  
  const selectedDepartment = departments.find(
    (dept) => dept.DepartmentName === dept_name
  );

  
  const otherDepartments = departments.filter(
    (dept) => dept.DepartmentName !== dept_name
  );

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {selectedDepartment ? (
        <div className="selecteddept">
          <div className="selectedDeptimg">
            <img
              src={filepath +"/"+ selectedDepartment.thumbnail}
              alt={selectedDepartment.DepartmentName}
            />
            <div className="details1">
              <h3>Contact Details</h3>
              <p>
                <MdOutlineEmail style={{ fontSize: "15px", marginRight: "10px" }} />
                cardiologi@hospitalplus.com
              </p>
              <p>
                <IoCall style={{ fontSize: "15px", marginRight: "10px" }} />
                +1 600 200 111
              </p>
              <p>
                <IoCall style={{ fontSize: "15px", marginRight: "10px" }} />
                +1 600 200 111
              </p>
            </div>
          </div>

          <div className="details">
            <h2>{selectedDepartment.DepartmentName}</h2>
            <p>{selectedDepartment.Description}</p>
          </div>
        </div>
      ) : (
        <p>Loading department details...</p>
      )}

      <div className="other">
        <div className="other1">
          <h1>Other Departments</h1>
        </div>

        <div className="depcard">
          <Slider {...sliderSettings}>
            {otherDepartments.map((dept, index) => (
              <div className="card card1" key={index}>
                <img src={filepath +"/"+ dept.thumbnail} alt={dept.DepartmentName} />
                <h1>
                  <Link to={`/Departments/${dept.DepartmentName}`}>
                    {dept.DepartmentName}
                  </Link>
                </h1>
                <p>{dept.Description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default DepartmentDetails;
