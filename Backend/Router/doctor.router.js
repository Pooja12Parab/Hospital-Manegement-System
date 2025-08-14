import express from "express";
import {
  addDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorbyName,
} from "../Controller/doctor.controller";

const router = express.Router();

router.post("/add-doctor", addDoctor);
router.get("/get-doctors", getDoctors);
router.get("/get-doctor/:doctor_id", getDoctor);
router.get("/get-doctor-by-name/:doctor_name", getDoctorbyName);
router.put("/update-doctor/:doctor_id", updateDoctor);
router.delete("/delete-doctor/:doctor_id", deleteDoctor);

export default router;
