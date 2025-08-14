import React from "react";
// import { DepartmentList } from "../components/Appointment";
import "../components/OurDoctors.css";
import { useParams } from "react-router-dom";
import "./Doctordetails.css";
import { useQuery } from "react-query";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DoctorDetails = () => {
  const { doctor_Name } = useParams();

  // Fetch all doctors
  const {
    isLoading: allDoctorsLoading,
    error: allDoctorsError,
    data: allDoctors,
  } = useQuery("doctors", async () => {
    const response = await axios.get("http://localhost:8000/get-doctors");
    setFilepath(response.data.filepath);
    return response.data?.data || [];
  });

  // Fetch specific doctor details
  const [filepath, setFilepath] = React.useState("");
  const {
    isLoading: doctorLoading,
    error: doctorError,
    data: doctorDetails,
  } = useQuery(["doctors", doctor_Name], async () => {
    const response = await axios.get(
      `http://localhost:8000/get-doctor-by-name/${doctor_Name}`
    );
    setFilepath(response.data.filepath);
    return response.data?.data;
  });

  if (allDoctorsLoading || doctorLoading) return <p>Loading...</p>;
  if (allDoctorsError)
    return <p>Error loading doctors: {allDoctorsError.message}</p>;
  if (doctorError) return <p>Error loading doctor: {doctorError.message}</p>;

  if (!doctorDetails) return <p>Doctor not found.</p>;

  const otherDoctors = allDoctors.filter(
    (doc) => doc.DoctorName !== doctor_Name
  );

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],

   
  };
  return (
    <>
      <div className="headerimg">
        <div className="dpage">DOCTORS</div>
      </div>

      <div className="doctorinfo">
        <div className="doctor-img">
          <img
            src={filepath + "/" + doctorDetails.thumbnail}
            alt={doctorDetails.DoctorName}
          />
        </div>
        <div className="doctordetails">
          <h4>{doctorDetails.DoctorName}</h4>
          <h5>{doctorDetails.DepartmentName.DepartmentName}</h5>
          <p>{doctorDetails.description}</p>
          <p className="condetails">
            <MdOutlineEmail style={{ fontSize: "15px", marginRight: "10px" }} />
            john@hospitalplus.com
          </p>
          <p>
            <IoCall style={{ fontSize: "15px", marginRight: "10px" }} />
            1-8700-9822
          </p>
        </div>
      </div>
      <div className="other">
        <div className="other1">
          <h1>Other Doctors</h1>
        </div>

        <div className="doctorslider">
          {otherDoctors.length > 0 ? (
            <Slider {...sliderSettings}>
              {otherDoctors.map((doctor, index) => (
                <div className="doctor-card" key={index}>
                  <img src={filepath + "/" + doctor.thumbnail} />
                  <h4>
                    <NavLink to={`/Doctors/${doctor.DoctorName}`}>
                      {doctor.DoctorName}
                    </NavLink>
                  </h4>
                  <h5>{doctor.DepartmentName?.DepartmentName}</h5>
                  <p>{doctor.description}</p>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No other doctors available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
