import express from "express";

import { body, param } from "express-validator";
import {
  addAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} from "../Controller/appointment.controller";

const router = express.Router();

const appointmentValidation = [
  body("PatientName").notEmpty().withMessage("Patient Name is required"),
  body("PhoneNumber").notEmpty().withMessage("Phone Number is reqiured"),
  body("Email").isEmail().optional(),
  param("DepartmentName").notEmpty().withMessage("DepartmentName is required"),
  param("DoctorName").notEmpty().withMessage("DoctorName is required"),
  body("schedule.date").notEmpty().withMessage("schedule is required"),
  body("schedule.day").notEmpty().withMessage("schedule is required"),
  body("schedule.time").notEmpty().withMessage("schedule is required"),

  body("appointmentStatus")
    .notEmpty()
    .withMessage("appointmentStatus is required"),
];

router.post("/add-appointment", appointmentValidation, addAppointment);
router.get("/get-appointments", getAppointments);
router.get("/get-appointment/:appointment_id", getAppointment);
router.put(
  "/update-appointment/:appointment_id",
  appointmentValidation,
  updateAppointment
);
router.delete("/delete-appointment/:appointment_id", deleteAppointment);

export default router;
