import express from "express";
import {
  addContact,
  getContacts,
  getContact,
  deleteContact,
} from "../Controller/contact.controller";
const router = express.Router();
router.post("/add-contact", addContact);
router.get("/get-contacts", getContacts);
router.get("/get-contact/:contact_id", getContact);
router.delete("/delete-contact/:contact_id", deleteContact);
export default router;
