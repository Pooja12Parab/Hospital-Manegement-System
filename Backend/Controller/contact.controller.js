import contactModel from "../Model/contact.model";
export const addContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All required fields must be provided",
        success: false,
      });
    }
    const ContactData = await contactModel.create({
      name,
      email,
      message,
    });
    return res.status(200).json({
      data: ContactData,
      message: "Contact created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
export const getContacts = async (req, res) => {
  try {
    const ContactData = await contactModel.find();
    return res.status(200).json({
      data: ContactData,
      message: "Contact Data Fetched",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export const getContact = async (req, res) => {
  try {
    const contactId = req.params.contact_id;
    const contactData = await adminModel.findOne({ _id: contactId });
    return res.status(200).json({
      data: contactData,
      message: "Contact data fetched",
    });
  } catch {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contact_id;
    const deleteContact = await contactModel.deleteOne({ _id: contactId });
    if (deleteContact.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "Contact deleted successfully", success: true });
    }
return res
      .status(404)
      .json({ message: "Contact not found!", success: false });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
