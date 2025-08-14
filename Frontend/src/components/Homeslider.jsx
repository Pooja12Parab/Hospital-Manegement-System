import React, { useState, useEffect } from "react";
import Data from "./slider"; 
import "./Slider.css"; 

const Homeslider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === Data.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Data.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="Mainbg">
      {Data.map((item, index) => (
        <div
          className={`subbg1 ${index === currentIndex ? "active" : ""}`}
          key={index}
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text">
            <h3>{item.rank}</h3>
            <h1>{item.heading}</h1>
            <p>{item.text}</p>
            {item.btn && <button>Learn More</button>}
          </div>
        </div>
      ))}

      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Homeslider;
