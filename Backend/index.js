import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import departmentRouter from "./Router/department.router";
import doctorRouter from "./Router/doctor.router";
import appointmentRouter from "./Router/appointment.router";
import cors from "cors";
import adminRouter from "./Router/admin.router";
import contactRouter from "./Router/contact.router";

const app = express();

app.use(express.json());
const port = process.env.PORT;

app.use("/static", express.static("uploads"));

const corsOptions = {
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
mongoose.connect(process.env.DB_URL).then(() => console.log("DB Connected!"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.use(departmentRouter);
app.use(appointmentRouter);
app.use(doctorRouter);
app.use(adminRouter);
app.use(contactRouter);
