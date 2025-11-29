import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    nationalId: { type: String, default: "" },
    nationality: { type: String, default: "" },
    conuntryFlag: { type: String, default: "" },
  },
  { timestamps: true }
);

const GuestModel = mongoose.model("guest", guestSchema);

export default GuestModel;
