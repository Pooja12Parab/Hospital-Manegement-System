import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Doctorpage from "./pages/Doctorpage";
import Departmentpage from "./pages/Departmentpage";
import Contactpage from "./pages/Contactpage";
import DepartmentDetails from "./pages/DepartmentDetails";
import DoctorDetails from "./pages/DoctorDetails";
import DoctorsSchedules from "./pages/DoctorsSchedules";
import Signuppage from "./pages/Signuppage";
import LoginPage from "./pages/loginpage";
import AdminAppointments from "./pages/AdminAppointments";
import AdminDepartments from "./pages/AdminDepartments";
import AdminDoctors from "./pages/AdminDoctors";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/Doctors/" element={<Doctorpage />} />
          <Route path="/Doctors/:doctor_Name" element={<DoctorDetails />} />
          <Route
            path="/Doctors/:doctor_Name/DoctorSchedule"
            element={<DoctorsSchedules />}
          />
          <Route path="/Departments" element={<Departmentpage />} />
          <Route
            path="/Departments/:dept_name"
            element={<DepartmentDetails />}
          />
          <Route path="/Contact" element={<Contactpage />} />
        
        </Route>

        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin/" element={<AdminDepartments />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/appointment" element={<AdminAppointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
