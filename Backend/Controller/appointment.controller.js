import appointmentModel from "../Model/appointment.model";


export const addAppointment = async (req, res) => {
  try {
    const {
      PatientName,
      PhoneNumber,
      Email,
      DepartmentName,
      DoctorName,
      schedule,
      appointmentStatus,
    } = req.body;

    if (
      !PatientName ||
      !PhoneNumber ||
      !DepartmentName ||
      !DoctorName ||
      !schedule
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
        success: false,
      });
    }

    const existingAppointment = await appointmentModel.findOne({
      "schedule.date": schedule.date,
      "schedule.time": schedule.time,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked",
        success: false,
      });
    }

    const created = await appointmentModel.create({
      PatientName,
      PhoneNumber,
      Email,
      DepartmentName,
      DoctorName,
      schedule: {
        date: schedule.date,
        day: schedule.day,
        time: schedule.time,
      },
      appointmentStatus,
    });

    return res.status(200).json({
      data: created,
      message: "Appointment created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointmentdata = await appointmentModel.find();
    return res.status(200).json({
      data: appointmentdata,
      message: "Appointments fetched successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const appointmentid = req.params.appointment_id;
    const appointmentData = await appointmentModel.findOne({
      _id: appointmentid,
    });

    if (appointmentData) {
      return res.status(200).json({
        data: appointmentData,
        message: "Appointment fetched successfully",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointmentid = req.params.appointment_id;
    const {
      PatientName,
      PhoneNumber,
      Email,
      DepartmentName,
      DoctorName,
      schedule,
      appointmentStatus,
    } = req.body;

    const updatedAppointment = await appointmentModel.updateOne(
      { _id: appointmentid },
      {
        $set: {
          PatientName,
          PhoneNumber,
          Email,
          DepartmentName,
          DoctorName,
          schedule,
          appointmentStatus,
        },
      }
    );

    if (updatedAppointment.modifiedCount > 0) {
      return res.status(200).json({
        message: "Appointment updated successfully",
        success: true,
      });
    }

    return res.status(400).json({
      message: "No changes made or appointment not found",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointmentid = req.params.appointment_id;
    const deleteappointment = await appointmentModel.deleteOne({
      _id: appointmentid,
    });

    if (deleteappointment.deletedCount > 0) {
      return res.status(200).json({
        message: "Appointment data deleted successfully!",
        success: true,
      });
    }

    return res.status(404).json({
      message: "Appointment not found or already deleted",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
