import adminModel from "../Model/admin.model";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  let token = null;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization;
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded) {
        const admin = await adminModel
          .findOne({ _id: decoded.data.id })
          .select("-password");
        console.log("middleware", admin);
        req.admin = admin;
        next();
      } 
    } else {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
export const admin = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({
      message: "Unauthorized access. Please log in.",
      success: false,
    });
  }

  if (!req.admin.isAdmin) {
    return res.status(403).json({
      message: "Access denied. Admin privileges required.",
      success: false,
    });
  }

  next();
};
