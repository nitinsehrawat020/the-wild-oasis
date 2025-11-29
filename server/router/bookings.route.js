import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  deleteBooking,
  getBookingAfterDate,
  getBookingController,
  getBookingsController,
  getStaysAfterDate,
  getStayTodaysActivity,
  updateBooking,
} from "../controller/booking.controller.js";

const bookingsRouter = Router();

bookingsRouter.get("/getBookings", auth, getBookingsController);
bookingsRouter.get("/getBooking/:bookingId", auth, getBookingController);
bookingsRouter.post("/getBookingsAfterDate", auth, getBookingAfterDate);
bookingsRouter.post("/getStaysAfterDate", auth, getStaysAfterDate);
bookingsRouter.get("/getStayTodaysActivity", auth, getStayTodaysActivity);
bookingsRouter.post("/updateBooking", auth, updateBooking);
bookingsRouter.delete("/deleteBooking/:bookingId", auth, deleteBooking);

export default bookingsRouter;
