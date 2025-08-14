import express from "express";
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../Controller/department.controller";

const router = express.Router();

router.post("/add-department", addDepartment);
router.get("/get-departments", getDepartments);
router.get("/get-department/:department_id", getDepartment); 
router.put("/update-department/:department_id", updateDepartment); 
router.delete("/delete-department/:department_id", deleteDepartment); 

export default router; 
