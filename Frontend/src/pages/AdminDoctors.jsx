import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import axios from "axios";

const AdminDoctors = () => {
  const [Modalopen, setModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);

  const [editModalopen, seteditModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filepath, setFilepath] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [doctorsdetails, setdoctorsDetails] = useState({
    DoctorName: "",
    DepartmentName: "",
    description: "",
    schedule: { available_days: [], time_slots: [] },
    thumbnail: null,
  });

  const onChangeHandler = (event) => {
    const { name, type, files, value } = event.target;

    setdoctorsDetails((prevDetails) => {
      if (name === "available_days" || name === "time_slots") {
        return {
          ...prevDetails,
          schedule: {
            ...prevDetails.schedule,
            [name]: value,
          },
        };
      }

      return {
        ...prevDetails,
        [name]: type === "file" ? files[0] : value,
      };
    });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/get-departments"
        );
        setDepartments(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-doctors");
        setDoctors(response.data?.data || []);
        setFilepath(response.data.filepath);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [updateList]);

  const handleSubmit = async (event) => {
    console.log(doctorsdetails);
    const schedule = {
      available_days: doctorsdetails.schedule.available_days,
      time_slots: doctorsdetails.schedule.time_slots,
    };
    console.log("schedule", schedule);
    event.preventDefault();
    const formData = new FormData();
    formData.append("DoctorName", doctorsdetails.DoctorName);
    formData.append("DepartmentName", doctorsdetails.DepartmentName);
    formData.append("description", doctorsdetails.description);
    formData.append("schedule", JSON.stringify(schedule));
    if (doctorsdetails.thumbnail) {
      formData.append("thumbnail", doctorsdetails.thumbnail);
    }

    try {
      console.log(formData);
      await axios.post("http://localhost:8000/add-doctor", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Doctor added successfully!");
      setModalOpen(false);
      setUpdateList((prev) => !prev);
    } catch (error) {
      console.log("Error adding doctor:", error);
      alert("Failed to add doctor. Please try again.");
    }
  };
  const handleEdit = (doctor) => {
    console.log(doctor);
    setdoctorsDetails({
      ...doctor,

      schedule: { available_days: [].join(", "), time_slots: [].join(", ") },
    });
    seteditModalOpen(true);
  };

  const UpdatehandleSubmit = async (event) => {
    event.preventDefault();
    const schedule = {
      available_days: doctorsdetails.available_days,
      time_slots: doctorsdetails.time_slots,
    };

    const formData = new FormData();
    formData.append("DoctorName", doctorsdetails.DoctorName);
    formData.append("DepartmentName", doctorsdetails.DepartmentName);
    formData.append("description", doctorsdetails.description);
    formData.append("schedule", JSON.stringify(schedule));
    if (doctorsdetails.thumbnail instanceof File) {
      formData.append("thumbnail", doctorsdetails.thumbnail);
    } else if (typeof doctorsdetails.thumbnail === "string") {
      formData.append("existingThumbnail", doctorsdetails.thumbnail);
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/update-doctor/${doctorsdetails.id}`,
        formData,

        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);

      alert("Doctor Details updated successfully!");
      seteditModalOpen(false);
      setUpdateList((prev) => !prev);
    } catch (err) {
      console.error("Error updating doctor:", err);
      alert("Failed to update doctor. Please try again.");
    }
  };
   const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this doctor details?")) {
        try {
          await axios.delete(`http://localhost:8000/delete-doctor/${id}`);
          alert("Doctors details deleted successfully!");
          setUpdateList((prev) => !prev);
        } catch (error) {
          console.error("Error deleting department:", error);
          alert("Failed to delete doctor.");
        }
      }
    };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "DoctorName", headerName: "Doctor Name", width: 150 },
    { field: "DepartmentName", headerName: "Department Name", width: 180 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "available_days", headerName: "Available Days", width: 160 },
    { field: "time_slots", headerName: "Time Slots", width: 160 },
    {
      field: "thumbnail",
      headerName: "Profile",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <img src={`${filepath}/${params.value}`} alt="Profile" width={100} />
        ) : (
          "No Image"
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <button className="editbtn" onClick={() => handleEdit(params.row)}>
            <MdEdit />
          </button>
          <button className="editbtn" onClick={() => handleDelete(params.row.id)}>
            <MdDelete />
          </button>
        </>
      ),
    },
  ];

  const rows = doctors.map((doctor) => {
    return {
      id: doctor._id,
      DoctorName: doctor.DoctorName,
      DepartmentName: doctor.DepartmentName?.DepartmentName,
      description: doctor.description,
      available_days: doctor.schedule?.available_days,
      time_slots: doctor.schedule?.time_slots,
      thumbnail: doctor.thumbnail,
    };
  });

  return (
    <>
      <div className="add">
        <h1>Manage Doctors</h1>
        <button className="edit-btn" onClick={() => setModalOpen(true)}>
          Add <FaPlus />
        </button>
      </div>

      {Modalopen && (
        <div className="modal-form doctor-modal">
          <div className="modal-form-details modal-doctor">
            <form className="modal-details" onSubmit={handleSubmit}>
              <h1>Doctor Details</h1>
              <div className="modal-form-group modal-doctor-group">
                <label>Doctor Name</label>
                <input
                  type="text"
                  name="DoctorName"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="modal-form-group modal-doctor-group">
                <label>Department Name</label>
                <select
                  name="DepartmentName"
                  value={doctorsdetails.DepartmentName}
                  onChange={onChangeHandler}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.DepartmentName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-form-group modal-doctor-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="modal-form-group modal-doctor-group">
                <label>Available Days</label>

                <input
                  type="text"
                  name="available_days"
                  // value={doctorsdetails.schedule.available_days}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="modal-form-group modal-doctor-group">
                <label>Time Slots</label>
                <input
                  type="text"
                  name="time_slots"
                  // value={doctorsdetails.schedule.time_slots}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="modal-form-group modal-doctor-group">
                <label>Profile</label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={onChangeHandler}
                />
                <button className="add-deptbtn add-doctor-btn" type="submit">
                ADD DOCTOR
              </button>
              </div>
              
              <button className="closebtn" onClick={() => setModalOpen(false)}>
                x
              </button>
            </form>
          </div>
        </div>
      )}

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Box>

      {editModalopen && (
        <>
          {console.log(doctorsdetails)}
          <div className="modal-form doctor-modal edit-modal">
            <div className="modal-form-details modal-doctor">
              <form className="modal-details" onSubmit={UpdatehandleSubmit}>
                <h1 style={{fontSize:18}}>Update Doctor Details</h1>
                <div className="modal-form-group modal-doctor-group">
                  <label>Doctor Name</label>
                  <input
                    type="text"
                    name="DoctorName"
                    value={doctorsdetails.DoctorName}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="modal-form-group modal-doctor-group">
                  <label>Department Name</label>
                  <input
                    type="text"
                    name="DoctorName"
                    value={doctorsdetails.DepartmentName}
                    readOnly
                  />
                  

                 <label>Change Department <span>
                 <input
                    type="checkbox"
                    checked={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.checked)}
                  /></span></label> 
                  {/* Show Dropdown to Change Department (Only If Checkbox is Checked) */}
                  {editDepartment && (
                    <select
                      name="DepartmentName"
                      value={doctorsdetails.DepartmentName}
                      style={{padding:10,fontSize:12}}
                      
                      onChange={(e) =>
                        setdoctorsDetails({
                          ...doctorsdetails,
                          DepartmentName: e.target.value,
                        })
                      }
                      
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.DepartmentName}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="modal-form-group modal-doctor-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    value={doctorsdetails.description}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="modal-form-group modal-doctor-group">
                  <label>Available Days</label>
                  <input
                    type="text"
                    name="available_days"
                    value={doctorsdetails.available_days}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="modal-form-group modal-doctor-group">
                  <label>Time Slots</label>
                  <input
                    type="text"
                    name="time_slots"
                    value={doctorsdetails.time_slots}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="modal-form-group modal-doctor-group">
                  <label>Profile</label>
                  {doctorsdetails.thumbnail && (
                    <img
                      src={`${filepath}/${doctorsdetails.thumbnail}`}
                      alt="Profile"
                      width={50}
                    />
                  )}
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={onChangeHandler}
                  />
                </div>
                <button className="add-deptbtn add-doctor-btn" type="submit">
                  UPDATE DOCTOR
                </button>
                <button
                  className="closebtn"
                  onClick={() => seteditModalOpen(false)}
                >
                  x
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDoctors;
