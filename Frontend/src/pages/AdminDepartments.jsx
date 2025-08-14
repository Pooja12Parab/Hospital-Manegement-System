import React, { useEffect, useState } from "react";
import "./AdminDepartments.css";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const AdminDepartments = () => {
  const [Modalopen, setModalOpen] = useState(false);
  const [editModalopen, seteditModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [filepath, setFilepath] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [departmentdetails, setdepartmentDetails] = useState({
    id: "",
    DepartmentName: "",
    Description: "",
    thumbnail: null,
  });

  const onChangeHandler = (event) => {
    const { name, type, files, value } = event.target;
    setdepartmentDetails({
      ...departmentdetails,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    console.log(departmentdetails.thumbnail);

    formData.append("DepartmentName", departmentdetails.DepartmentName);
    formData.append("Description", departmentdetails.Description);

    if (departmentdetails.thumbnail) {
      formData.append("thumbnail", departmentdetails.thumbnail);
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/add-department",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Department added successfully:", response.data?.data);
      alert("Department added successfully!");
      setModalOpen(false);
      setUpdateList((prev) => !prev);
    } catch (error) {
      console.error(
        "Error adding department:",
        error.response?.data || error.message
      );
      alert("Failed to add department. Please try again.");
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/get-departments"
        );
        setDepartments(response.data?.data || []);
        setFilepath(response.data.filepath);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepartments();
  }, [updateList]);

  const handleEdit = (department) => {
    setdepartmentDetails({ ...department });
    seteditModalOpen(true);
  };

  const updatehandleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("DepartmentName", departmentdetails.DepartmentName);
    formData.append("Description", departmentdetails.Description);
    if (departmentdetails.thumbnail instanceof File) {
      formData.append("thumbnail", departmentdetails.thumbnail);
    } else if (typeof departmentdetails.thumbnail === "string") {
      formData.append("existingThumbnail", departmentdetails.thumbnail);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/update-department/${departmentdetails.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Department updated successfully!");
      seteditModalOpen(false);
      setUpdateList((prev) => !prev);
    } catch (error) {
      console.error("Error updating department:", error);
      alert("Failed to update department. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`http://localhost:8000/delete-department/${id}`);
        alert("Department deleted successfully!");
        setUpdateList((prev) => !prev);
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Failed to delete department.");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "DepartmentName", headerName: "Department Name", width: 200 },
    { field: "Description", headerName: "Description", width: 300 },
    {
      field: "thumbnail",
      headerName: "Profile",
      width: 200,
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
          <button
            className="editbtn"
            onClick={() => handleDelete(params.row.id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    },
  ];

  const rows = departments.map((dept) => ({
    id: dept._id,
    DepartmentName: dept.DepartmentName,
    Description: dept.Description,
    thumbnail: dept.thumbnail,
  }));

  return (
    <>
      <div className="add">
        <h1>Manage Departments</h1>
        <button className="edit-btn" onClick={() => setModalOpen(true)}>
          Add <FaPlus />
        </button>
      </div>

      {Modalopen && (
        <div className="modal-form">
          <div className="modal-form-details">
            <form className="modal-details" onSubmit={handleSubmit}>
              <h1>Department Details</h1>
              <div className="modal-form-group">
                <label>Department Name</label>
                <input
                  type="text"
                  name="DepartmentName"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="modal-form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="Description"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="modal-form-group">
                <label>Profile</label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={onChangeHandler}
                />
              </div>
              <button className="add-deptbtn" type="submit">
                ADD DEPARTMENT
              </button>
              <button className="closebtn" onClick={() => setModalOpen(false)}>
                x
              </button>
            </form>
          </div>
        </div>
      )}

      <Box sx={{ height: 400, width: "100%" }}>
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
        <div className="modal-form edit-form">
          <div className="modal-form-details">
            <form className="modal-details" onSubmit={updatehandleSubmit}>
              <h1>Update Department</h1>
              <div className="modal-form-group">
                <label>Department Name</label>
                <input
                  type="text"
                  name="DepartmentName"
                  value={departmentdetails.DepartmentName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="modal-form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="Description"
                  value={departmentdetails.Description}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="modal-form-group">
                <label>Profile</label>
                {departmentdetails.thumbnail && (
                  <img
                    src={`${filepath}/${departmentdetails.thumbnail}`}
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
              <button className="add-deptbtn" type="submit">
                UPDATE DEPARTMENT
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
      )}
    </>
  );
};

export default AdminDepartments;
