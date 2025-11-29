import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  minBookingLength: { type: Number, default: 5 },
  maxbookingLength: { type: Number, default: 60 },
  maxGuestPerBooking: { type: Number, default: 8 },
  breakfastPrice: { type: Number, default: 25 },
});
const settingModel = mongoose.model("setting", settingSchema);
export default settingModel;
