import React from "react";
import { LiaElementor } from "react-icons/lia";
import { FaDisplay } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { SlCalender } from "react-icons/sl";
import { MdPhoneIphone } from "react-icons/md";
import "./Homesec.css";

const Homesec = () => {
  return (
    <div className="homesec">
      <div className="heading">
        <h1>BEST HOSPITAL IN TOWN</h1>
        <p>When It Come to Health Care</p>
      </div>

      <div className="homesec1">
        <div className="sec">
          <span>
            <LiaElementor style={{ fontSize: 50, color: "tomato" }} />
          </span>
          <h3>Powerful Theme Options</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard.
          </p>
        </div>
        <div className="sec">
          <span>
            <FaDisplay style={{ fontSize: 50, color: "tomato" }}/>
          </span>
          <h3>Drag & Drop Page Builder</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard.
          </p>
        </div>
        <div className="sec">
          <span>
            <FaPen style={{ fontSize: 50, color: "tomato" }}/>
          </span>
          <h3>Easy to Customize</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard.
          </p>
        </div>
        <div className="sec">
          <span>
            <TiDocumentText style={{ fontSize: 50, color: "tomato" }}/>
          </span>
          <h3>Theme Documentation</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard.
          </p>
        </div>
        <div className="sec">
          <span>
            <SlCalender style={{ fontSize: 40, color: "tomato" }}/>
          </span>
          <h3>Years of Experience</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard.</p>
        </div>
        <div className="sec">
          <span>
            <MdPhoneIphone style={{ fontSize: 50, color: "tomato" }}/>
          </span>
          <h3>Responsive Layout</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homesec;
