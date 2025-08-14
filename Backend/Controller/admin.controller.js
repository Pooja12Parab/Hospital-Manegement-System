import adminModel from "../Model/admin.model";
import path from "path";
import fs from "fs";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads")) {
      cb(null, "./uploads");
    } else {
      fs.mkdirSync("./uploads");
      cb(null, "./uploads");
    }
  },
  filename: function (req, file, cb) {
    const orgName = file.originalname;
    const fname = path.parse(orgName).name;
    const ext = path.parse(orgName).ext;
    const uniqueValue = Date.now();
    const filename = fname + "-" + uniqueValue + ext;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

export const addAdmin = async (req, res) => {
  try {
    upload.single("thumbnail")(req, res, async (err) => {
      if (err)
        return res.status(400).json({ message: err.message, success: false });

      const { name, email, password, contact } = req.body;
      if (!name || !email || !password || !contact) {
        return res
          .status(400)
          .json({ message: "All fields are required", success: false });
      }

      let img = req.file ? req.file.filename : null;

      const created = await adminModel.create({
        name,
        email,
        password,
        contact,
        thumbnail: img,
      });

      return res.status(200).json({
        data: created,
        message: "Admin Data Created",
        success: true,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const adminData = await adminModel.find();
    return res.status(200).json({
      data: adminData,
      message: "Admin Data Fetched",
      filepath: "http://localhost:8000/static",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const adminId = req.params.admin_id;
    const adminData = await adminModel.findOne({ _id: adminId });
    return res.status(200).json({
      data: adminData,
      message: "admin data fetched",
      filepath: "http://localhost:8000/static",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export const updateAdmin = async (req, res) => {
  try {
    const uploadDataWidthFile = upload.single("thumbnail");
    uploadDataWidthFile(req, res, async (err) => {
      if (err)
        return res.status(400).json({ message: err.message, success: false });

      const adminId = req.params.user_id;
      const adminData = await adminModel.findOne({ _id: adminId });

      let img = adminData.image;
      if (req.file) {
        img = req.file.filename;
        if (fs.existsSync("/uploads/" + adminData.image)) {
          fs.unlinkSync("./uploads/" + adminData.image);
        }
      }
      const { name, email, password, contact } = req.body;
      const updateAdmin = await adminModel.updateOne(
        { _id: adminId },
        {
          $set: {
            name: name,
            email: email,
            password: password,
            contact: contact,
            thumbnail: img,
          },
        }
      );
      if (updateAdmin.modifiedCount > 0) {
        return res.status(200).json({
          message: "Admin Data Updated",
          sussess: true,
        });
      }
      return res.status(400).json({
        massage: "Something went wrong",
        success: false,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export const deleteAdmin = async (req, res) => {
  try {
    const adminid = req.params.user_id;
    const adminData = await userModel.findOne({ _id: adminid });
    const deleteAdmin = await userModel.deleteOne({ _id: adminid });

    if (deleteAdmin.deletedCount > 0) {
      if (fs.existsSync("./uploads/" + adminData.image)) {
        fs.unlinkSync("./uploads/" + adminData.image);
      }
      return res.status(200).json({
        message: "Admin Data Deleted",
        success: true,
      });
    }
    return res.status(400).json({
      message: "Something went worng",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

// Auth

export const signUp = async (req, res) => {
  // Handle file upload first
  upload.single("thumbnail")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message, success: false });
    }

    try {
      const { name, email, password, contact } = req.body;
      const img = req.file ? req.file.filename : null;

      const existAdmin = await adminModel.findOne({ email });
      if (existAdmin) {
        return res.status(400).json({
          message: "Admin already exists!",
          success: false,
        });
      }

      const hashPassword = bcrypt.hashSync(password, 12);

      const saveAdmin = await adminModel.create({
        name,
        email,
        password: hashPassword,
        contact,
        thumbnail: img,
      });

      return res.status(201).json({
        data: saveAdmin,
        message: "Signup successful",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message, success: false });
    }
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existAdmin = await adminModel.findOne({ email: email });
    if (!existAdmin) {
      return res.status(400).json({
        message: "User doesn't exist!",
        success: false,
      });
    }

    const match = await bcrypt.compare(password, existAdmin.password);
    if (!match) {
      return res.status(400).json({
        message: "Invalid credential",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        data: { id: existAdmin._id },
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const adminData = await adminModel.findOne({ email }).select("-password");

    return res.status(200).json({
      data: adminData,
      token,
      message: "Successful login",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
