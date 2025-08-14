import departmentModel from "../Model/department.model";
import path from "path";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if(fs.existsSync('./uploads')){
          cb(null, './uploads')
      }else{
          fs.mkdirSync("./uploads")
          cb(null, './uploads')
      }
  },
  filename: function (req, file, cb) {
      const orgName = file.originalname;
      const fname = path.parse(orgName).name
      const ext = path.parse(orgName).ext;
      const uniqueValue = Date.now();
      const filename = fname+'-'+uniqueValue+ext
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

export const addDepartment = async (req, res) => {
  const uploadSingle = upload.single("thumbnail");

  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message, success: false });

    try {
      const { DepartmentName, Description } = req.body;
      const thumbnail = req.file?.filename || null;

      const created = await departmentModel.create({
        DepartmentName,
        Description,
        thumbnail
      });

      return res.status(201).json({
        data: created,
        message: "Department created successfully",
        success: true
      });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  });
};


export const getDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.find();
    return res.status(200).json({
      data: departments,
      filepath: "http://localhost:8000/static",
      message: "Departments fetched successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const { department_id } = req.params;
    const department = await departmentModel.findById(department_id);

    if (!department) {
      return res
        .status(404)
        .json({ message: "Department not found", success: false });
    }

    return res.status(200).json({
      data: department,
      message: "Department fetched successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export const updateDepartment = async (req, res) => {
  const uploadSingle = upload.single("thumbnail");
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message, success: false });
    }

    try {
      const { department_id } = req.params;
      const { DepartmentName, Description } = req.body;
      const thumbnail = req.file?.filename || null;

      const existingDepartment = await departmentModel.findById(department_id);
      if (!existingDepartment) {
        return res.status(404).json({ message: "Department not found", success: false });
      }

      // Remove old image if a new one is uploaded
      if (thumbnail && existingDepartment.thumbnail) {
        const oldImagePath = path.join(UPLOAD_DIR, existingDepartment.thumbnail);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      const updatedDepartment = await departmentModel.findByIdAndUpdate(
        department_id,
        {
          $set: {
            DepartmentName,
            Description,
            ...(thumbnail && { thumbnail})
          }
        },
        { new: true }
      );

      return res.status(200).json({
        data: updatedDepartment,
        message: "Department updated successfully!",
        success: true
      });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  });
};


export const deleteDepartment = async (req, res) => {
  try {
    const { department_id } = req.params;
    const department = await departmentModel.deleteOne({_id:department_id});

    if (!department) {
      return res
        .status(404)
        .json({ message: "Department not found", success: false });
    }

    if (department.thumbnail) {
      const imagePath = path.join(UPLOAD_DIR, department.thumbnail);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    return res
      .status(200)
      .json({ message: "Department deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
