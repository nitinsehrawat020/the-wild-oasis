import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    startDate: { type: Date, default: "" },
    endDate: { type: Date, default: "" },
    numNight: { type: Number, default: "" },
    numGuest: { type: Number, default: "" },
    cabinPrice: { type: Number, default: "" },
    extraPrice: { type: Number, default: "" },
    totalPrice: { type: Number, default: "" },
    status: { type: String, default: "" },
    hasBreakfast: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: "" },
    observation: { type: String, default: "" },
    cabinId: { type: mongoose.Schema.ObjectId, ref: "cabins" },
    guestId: { type: mongoose.Schema.ObjectId, ref: "guest" },
  },
  { timestamps: true }
);
const BookingModel = mongoose.model("bookings", bookingSchema);

export default BookingModel;
