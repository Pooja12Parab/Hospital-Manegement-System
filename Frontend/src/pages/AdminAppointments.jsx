import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/get-appointments"
      );
      setAppointments(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setSelectedAppointment({
      ...selectedAppointment,
      appointmentStatus: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/update-appointment/${selectedAppointment.id}`,
        {
          appointmentStatus: selectedAppointment.appointmentStatus,
        }
      );
      setIsEditing(false);
      fetchAppointments(); // Refresh list
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "PatientName", headerName: "Patient Name", width: 150 },
    { field: "PhoneNumber", headerName: "Phone Number", width: 180 },
    { field: "Email", headerName: "Email", width: 150 },
    { field: "DepartmentName", headerName: "Department Name", width: 130 },
    { field: "DoctorName", headerName: "Doctor Name", width: 160 },
    { field: "ScheduleDate", headerName: "Schedule Date", width: 130 },
    {
      field: "appointmentStatus",
      headerName: "Appointment Status",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <button className="editbtn" onClick={() => handleEdit(params.row)}>
          <MdEdit />
        </button>
      ),
    },
  ];

  const rows = appointments.map((appointment) => ({
    id: appointment._id,
    PatientName: appointment.PatientName,
    PhoneNumber: appointment.PhoneNumber.toString(),
    Email: appointment.Email || "N/A",
    DepartmentName: appointment.DepartmentName,
    DoctorName: appointment.DoctorName,
    ScheduleDate: appointment.schedule?.date
      ? new Date(appointment.schedule.date).toLocaleDateString()
      : "N/A",
    appointmentStatus: appointment.appointmentStatus,
  }));

  return (
    <>
      <div className="add">
        <h1>Manage Appointments</h1>
      </div>
      <Box sx={{ height: 500, width: "100%", fontSize: "35px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      </Box>

      {isEditing && selectedAppointment && (
        <div className="modal-form edit-form">
          <div className="modal-form-details">
            <form className="modal-details" onSubmit={handleUpdate}>
              <h1>Update Appointment Status</h1>

              <div className="modal-form-group">
                <label>Appointment Status</label>
                <select
                  name="appointmentStatus"
                  value={selectedAppointment.appointmentStatus}
                  onChange={handleChange}
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button className="add-deptbtn" type="submit">
                UPDATE APPOINTMENT STATUS
              </button>
              <button className="closebtn" onClick={() => setIsEditing(false)}>
                x
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAppointments;
