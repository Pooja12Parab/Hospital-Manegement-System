import React from "react";
import Sidebar from "./../components/Sidebar";
import { Outlet } from "react-router-dom";
const AdminRoute = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <Sidebar>
          <Outlet />
        </Sidebar>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default AdminRoute;
