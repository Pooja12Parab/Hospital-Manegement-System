import doctorModel from "../Model/doctor.model";
import path from "path";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const orgName = file.originalname;
    const fname = path.parse(orgName).name;
    const ext = path.parse(orgName).ext;
    const uniqueValue = Date.now();
    const filename = `${fname}-${uniqueValue}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

export const addDoctor = async (req, res) => {
  const uploadDataWithFile = upload.fields([
    { name: "thumbnail", maxCount: 1 },
  ]);

  uploadDataWithFile(req, res, async (err) => {
    if (err)
      return res.status(400).json({ message: err.message, success: false });

    try {
      console.log("body", req.body);
      console.log("files", req.files);

      let img = null;
      if (req.files["thumbnail"] && req.files["thumbnail"][0]) {
        img = req.files["thumbnail"][0].filename;
      }

      const {
        DoctorName,
        DepartmentName,
        description,
        schedule: sch,
      } = req.body;
      console.log(sch);

      const schedule = JSON.parse(sch);

      console.log(schedule);

      const created = await doctorModel.create({
        thumbnail: img,
        DoctorName,
        DepartmentName,
        description,
        schedule,
      });

      return res.status(200).json({
        data: created,
        message: "Doctor created successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  });
};

export const getDoctors = async (req, res) => {
  try {
    const doctorData = await doctorModel.find().populate("DepartmentName");
    return res.status(200).json({
      data: doctorData,
      filepath: "http://localhost:8000/static",
      message: "Doctors fetched successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctor_id;
    const doctorData = await doctorModel.findOne({ _id: doctorId });

    if (!doctorData) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }

    return res.status(200).json({
      data: doctorData,
      message: "Doctor fetched successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
export const getDoctorbyName = async (req, res) => {
  try {
    const doctorName = req.params.doctor_name;
    const doctorData = await doctorModel
      .findOne({ DoctorName: doctorName })
      .populate("DepartmentName");
    if (!doctorData) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }

    return res.status(200).json({
      data: doctorData,
      filepath: "http://localhost:8000/static",
      message: "Doctor fetched successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateDoctor = async (req, res) => {
  const uploadDataWithFile = upload.fields([{ name: "thumbnail", maxCount: 1 }]);

  uploadDataWithFile(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message, success: false });

    try {
      const doctorId = req.params.doctor_id;
      let { DoctorName, DepartmentName, description, schedule } = req.body;

      // Parse Schedule JSON Safely
      let parsedSchedule = [];
      try {
        parsedSchedule = schedule ? JSON.parse(schedule) : [];
      } catch (err) {
        return res.status(400).json({ message: "Invalid schedule format", success: false });
      }

      // File Handling
      const newThumbnail = req.files?.thumbnail?.[0]?.filename || null;

      const existingDoctor = await doctorModel.findById(doctorId);
      if (!existingDoctor) {
        return res.status(404).json({ message: "Doctor not found", success: false });
      }

      // If new thumbnail uploaded, remove old file
      if (newThumbnail && existingDoctor.thumbnail) {
        const oldImagePath = path.join(UPLOAD_DIR, existingDoctor.thumbnail);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      const updateFields = {
        DoctorName,
        DepartmentName,
        description,
        schedule: parsedSchedule,
        ...(newThumbnail && { thumbnail: newThumbnail }),
      };

      const updatedDoctor = await doctorModel.findByIdAndUpdate(doctorId, updateFields, { new: true }).exec();

      return res.status(200).json({
        data: updatedDoctor,
        message: "Doctor updated successfully!",
        success: true
      });

    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  });
};



export const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctor_id;
    const deleteDoctor = await doctorModel.deleteOne({ _id: doctorId });

    if (deleteDoctor.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "Doctor deleted successfully", success: true });
    }

    return res
      .status(404)
      .json({ message: "Doctor not found!", success: false });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
