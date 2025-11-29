import mongoose from "mongoose";
import BookingModel from "../models/bookings.module.js";
import { ObjectId } from "mongodb";

const PAGE_SIZE = 10;

export async function getBookingsController(req, res) {
  const userId = req.userId;

  if (!userId) {
    return res.status(304).json({
      message: "unauthrozie access",
      success: false,
      error: true,
    });
  }

  let query = {};

  const { filter, sortBy, page = 1 } = req.query;

  if (filter) {
    const filterObj = typeof filter === "string" ? JSON.parse(filter) : filter;

    if (filterObj.field && filterObj.value) {
      query[filterObj.field] = filterObj.value;
    }
  }

  let sort = {};

  if (sortBy) {
    const sortObj = typeof sortBy === "string" ? JSON.parse(sortBy) : sortBy;
    if (sortObj.field) {
      sort[sortObj.field] = sortObj.direction === "asc" ? 1 : -1;
    }
  }

  const pageNum = parseInt(page);
  const skip = (pageNum - 1) * PAGE_SIZE;

  const [bookingsData, totalCount] = await Promise.all([
    BookingModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(PAGE_SIZE)
      .populate("cabinId")
      .populate("guestId")
      .lean(),
    BookingModel.countDocuments(query),
  ]);
  //   console.log(bookingData);
  return res.status(200).json({
    message: "sent",
    success: true,
    error: false,
    data: bookingsData,
    count: totalCount,
    page: pageNum,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
  });
}

export async function getBookingController(req, res) {
  try {
    const id = req.params.bookingId?.trim();
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid booking ID format",
        success: false,
        error: true,
      });
    }

    const booking = await BookingModel.findById(id)
      .populate("cabinId")
      .populate("guestId");

    if (!booking) {
      return res.status(404).json({
        message: "booking data not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "data sent",
      success: true,
      error: false,
      data: booking,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getBookingAfterDate(req, res) {
  try {
    const { date } = req.body;
    if (!date) {
      return res.status(400).json({
        message: "kindly provide the date",
        success: false,
        error: true,
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingData = await BookingModel.find({
      startDate: { $gte: new Date(date), $lte: today },
    })
      .sort({ startDate: 1 })
      .lean();

    return res.status(200).json({
      message: "data sed sucessfully",
      success: true,
      error: false,
      data: bookingData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getStaysAfterDate(req, res) {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        message: "kindly provide the date",
        success: false,
        error: true,
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stayData = await BookingModel.find({
      startDate: { $lte: today, $gte: new Date(date) },
    });

    return res.status(200).json({
      message: "data send successfully",
      success: true,
      error: false,
      data: stayData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getStayTodaysActivity(req, res) {
  try {
    const todayActivity = await BookingModel.find({
      $or: [
        { $and: [{ status: "unconfirmed" }, { startDate: new Date() }] },
        { $and: [{ status: "checked-in" }, { startDate: new Date() }] },
      ],
    });

    return res.status(200).json({
      message: "data send successfuly",
      success: true,
      error: false,
      data: todayActivity,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function updateBooking(req, res) {
  try {
    const { id, obj } = req.body;
    if (!id || !obj) {
      return res.status(400).json({
        message: "kindly provide all the details",
        success: false,
        error: true,
      });
    }

    const updatedBooking = await BookingModel.updateOne(
      { _id: id },
      { obj: obj }
    );

    if (!updatedBooking) {
      return res.status(500).json({
        message: error.message || error,
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "updated successfully ",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
export async function deleteBooking(req, res) {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        message: "kindlly provide the booking id",
        success: false,
        error: true,
      });
    }
    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
      return res.status(400).json({
        message: "booking already deleted",
        success: false,
        error: true,
      });
    }

    const deleteBooking = await BookingModel.deleteOne({
      _id: bookingId,
    });

    return res.status(200).json({
      message: "deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
