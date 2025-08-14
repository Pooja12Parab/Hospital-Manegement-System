import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./Appointmentsection.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentSection = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    PatientName: "",
    PhoneNumber: "",
    Email: "",
    schedule: {
      date: null,
      day: "",
      time: "",
    },
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };
  const onChangeHandlerDateTime = (date) => {
    setSelectedDate(date);
    setAppointmentDetails((prev) => ({
      ...prev,
      schedule: {
        date,
        day: date.toLocaleDateString("en-US", { weekday: "long" }),
        time: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    }));
  };
  // Handle Form Submission
  const handleSubmit = async () => {
    console.log("Appointment Details:", appointmentDetails);
    const finalAppointment = {
      ...appointmentDetails,
      department: selectedDepartment,
      doctor: selectedDoctor,
    };

    console.log("Appointment Details:", finalAppointment);

    try {
      const response = await axios.post(
        "http://localhost:8000/add-appointment",
        finalAppointment
      );
      console.log("Appointment booked successfully:", response.data);
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const navigate = useNavigate();
  // Fetch departments
  const {
    isLoading,
    error,
    data: departments,
  } = useQuery("departments", async () => {
    const response = await axios.get("http://localhost:8000/get-departments");
    return response.data?.data;
  });

  // Fetch doctors
  const { data: doctors } = useQuery("doctors", async () => {
    const response = await axios.get("http://localhost:8000/get-doctors");
    return response.data?.data || [];
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error.message}</p>;

  const selectedDoctorName = doctors
    ? doctors.filter(
        (doc) => doc.DepartmentName?.DepartmentName === selectedDepartment
      )
    : [];
  // console.log(selectedDoctorName);

  return (
    <div className="appointment">
      <div className="appointmentform">
        <div className="appointment-info">
          <h1>CHECK SCHEDULES</h1>
          <hr />

          {/* Department Selection */}
          <label htmlFor="department-select">
            DepartmentName
            <br />
            <select
              value={selectedDepartment}
              name="DepartmentName"
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedDoctor("");
              }}
            >
              <option value="" disabled>
                Select a department
              </option>
              {departments?.map((dept, index) => (
                <option key={index} value={dept.DepartmentName}>
                  {dept.DepartmentName}
                </option>
              ))}
            </select>
          </label>

          {/* Doctor Selection */}
          <label htmlFor="doctor-select">
            DoctorName
            <br />
            <select
              id="doctor-select"
              value={selectedDoctor}
              name="DoctorName"
              onChange={(e) => {
                setSelectedDoctor(e.target.value);
              }}
              disabled={!selectedDepartment}
            >
              <option value="" disabled>
                Select a doctor
              </option>

              {selectedDoctorName.map((doc, index) => (
                <option value={doc.DoctorName} key={index}>
                  {doc.DoctorName}
                </option>
              ))}
            </select>
          </label>
          <button
            className="btn"
            onClick={() =>
              navigate(`/Doctors/${selectedDoctor}/DoctorSchedule`)
            }
          >
            View Schedule
          </button>
        </div>

        <div className="patient-info">
          <h1>BOOK APPOINTMENT</h1>
          <hr />
          <form>
            <div className="pdetails">
              <label htmlFor="pName">Patient Name:</label>
              <input
                type="text"
                name="PatientName"
                value={appointmentDetails.PatientName}
                required
                onChange={onChangeHandler}
              ></input>
              <label htmlFor="contact">Phone Number:</label>
              <input
                type="text"
                name="PhoneNumber"
                value={appointmentDetails.PhoneNumber}
                onChange={onChangeHandler}
                required
              ></input>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="Email"
                value={appointmentDetails.Email}
                onChange={onChangeHandler}
              ></input>
              <br />
              <br></br>
            </div>
            <div className="pappointment-details">
              <label htmlFor="department-select">
                Department Name
                <br />
                <select
                  id="department-select"
                  name="DepartmentName"
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setSelectedDoctor("");
                    onChangeHandler(e);
                  }}
                >
                  <option value="" disabled>
                    Select a department
                  </option>
                  {departments?.map((dept, index) => (
                    <option key={index} value={dept.DepartmentName}>
                      {dept.DepartmentName}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="doctor-select">
                Doctor Name
                <br />
                <select
                  id="doctor-select"
                  value={selectedDoctor}
                  name="DoctorName"
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value);
                    onChangeHandler(e);
                  }}
                  disabled={!selectedDepartment}
                >
                  <option value="" disabled>
                    Select a doctor
                  </option>

                  {selectedDoctorName.map((doc, index) => (
                    <option value={doc.DoctorName} key={index}>
                      {doc.DoctorName}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="appointment-date">Select Date & Time:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  onChangeHandlerDateTime(date, "date");
                }}
                showTimeSelect
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="dd/MM/yyyy h:mm aa"
                minDate={new Date()}
                filterDate={(date) => date.getDay() !== 0} // Excludes Sundays
                filterTime={(time) => {
                  const hours = time.getHours();
                  return hours >= 9 && hours < 18; 
                }}
                required
              />
            </div>
          </form>
          <button className="subbtn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;
