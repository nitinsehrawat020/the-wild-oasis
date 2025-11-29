import cron from "node-cron";
import { isFuture, isPast, isToday } from "date-fns";
import mongoose from "mongoose";
import BookingModel from "../models/bookings.module.js";
import CabinModel from "../models/cabins.module.js";

function subtractDates(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

async function refreshBookingData() {
  try {
    console.log("🔄 Starting booking data refresh...");

    // Import bookings data
    const { bookings } = await import("../data/data-bookings.js");

    // Step 1: Delete all existing bookings only (keep guests as they are)
    await BookingModel.deleteMany({});
    console.log("✅ Deleted all existing bookings");

    // Step 2: Get all cabins from database
    const cabins = await CabinModel.find().lean();
    if (cabins.length === 0) {
      console.error("❌ No cabins found in database");
      return;
    }

    // Create a map of cabin IDs to cabin data for easy lookup
    const cabinMap = {};
    cabins.forEach((cabin) => {
      cabinMap[cabin._id.toString()] = cabin;
    });

    // Step 3: Prepare bookings with proper calculations
    const finalBookings = bookings
      .map((booking) => {
        const cabin = cabinMap[booking.cabinId];

        if (!cabin) {
          console.warn(
            `⚠️ Missing cabin for booking with cabinId: ${booking.cabinId}`
          );
          return null;
        }

        const numNight = subtractDates(booking.endDate, booking.startDate);
        const cabinPrice = numNight * (cabin.regularPrice - cabin.discount);
        const extraPrice = booking.hasBreakfast
          ? numNight * 15 * booking.numGuests
          : 0;
        const totalPrice = cabinPrice + extraPrice;

        let status;
        if (
          isPast(new Date(booking.endDate)) &&
          !isToday(new Date(booking.endDate))
        ) {
          status = "checked-out";
        } else if (
          isFuture(new Date(booking.startDate)) ||
          isToday(new Date(booking.startDate))
        ) {
          status = "unconfirmed";
        } else if (
          (isFuture(new Date(booking.endDate)) ||
            isToday(new Date(booking.endDate))) &&
          isPast(new Date(booking.startDate)) &&
          !isToday(new Date(booking.startDate))
        ) {
          status = "checked-in";
        }

        return {
          startDate: booking.startDate,
          endDate: booking.endDate,
          numNight,
          numGuest: booking.numGuests,
          cabinPrice,
          extraPrice,
          totalPrice,
          status,
          hasBreakfast: booking.hasBreakfast,
          isPaid: booking.isPaid,
          observation: booking.observations || "",
          cabinId: new mongoose.Types.ObjectId(booking.cabinId),
          guestId: new mongoose.Types.ObjectId(booking.guestId),
        };
      })
      .filter(Boolean);

    // Step 4: Insert fresh bookings
    const createdBookings = await BookingModel.insertMany(finalBookings);
    console.log(`✅ Created ${createdBookings.length} fresh bookings`);

    console.log("✨ Booking data refresh completed successfully!");
  } catch (error) {
    console.error("❌ Error refreshing booking data:", error);
  }
}

// Schedule cron job to run every 15 days at midnight
export function startBookingRefreshCron() {
  // Run every 15 days at 00:00 (midnight)
  // Cron pattern: minute hour day-of-month month day-of-week
  // */15 means every 15 days
  cron.schedule("0 0 */15 * *", async () => {
    console.log("⏰ Cron job triggered: Refreshing booking data...");
    await refreshBookingData();
  });

  console.log(
    "🕒 Booking refresh cron job scheduled: Every 15 days at midnight"
  );
}

// Export the manual refresh function for testing
export { refreshBookingData };
