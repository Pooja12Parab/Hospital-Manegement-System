import React from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./OurDoctors.css";

const OurDoctors = () => {
  const { isLoading, error, data } = useQuery("doctors_1", async () => {
    const response = await axios.get("http://localhost:8000/get-doctors");
    return response.data || [];
  });

  // console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error.message}</p>;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="doctor-slider">
      <div className="doctor">
        <h1>OUR DOCTORS</h1>
        <p>
          Our doctors are specialized in their field and have more than 10 years
          of experience.
        </p>
        <hr />
      </div>
      
      <div className="doctorslider">
        {data?.data.length > 0 ? (
          <Slider {...settings}>
            {data?.data.map((doctor, index) => (
              <div className="doctor-card" key={index}>
                <img src={data.filepath + "/" + doctor.thumbnail} />
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
  );
};

export default OurDoctors;
