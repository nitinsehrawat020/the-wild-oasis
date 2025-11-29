import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);
const ContactModel = mongoose.model("contact", contactSchema);

export default ContactModel;
