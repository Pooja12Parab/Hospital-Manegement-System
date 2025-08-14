import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
  PatientName: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    default: null,
  },
  DepartmentName: {
    type: String,
    required: true,
  },
  DoctorName: {
    type: String,
    required: true,
  },

  schedule: {
    date: { type: Date, required: true },
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  appointmentStatus: {
    type: String,
    lowercase: true,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("appointment", appointmentSchema);
