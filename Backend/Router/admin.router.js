import express from "express";

import {
  addAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  signUp,
  login,
} from "../Controller/admin.controller";
import { auth, admin } from "../middleware/authmiddleware";

const router = express.Router();
router.post("/add-admin", auth, admin, addAdmin);
router.get("/get-admins", auth, admin, getAdmins);
router.get("/get-admin/:admin_id", getAdmin);
router.put("/update-admin/:admin_id", auth, updateAdmin);
router.delete("/delete-admin/:admin_id", auth, admin, deleteAdmin);

// auth
router.post("/sign-up", signUp);
router.post("/login", login);

export default router;
