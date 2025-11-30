import { SummaryApi } from "../common/summaryApi";
import Axios from "../utils/axios";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  const params = new URLSearchParams();

  if (filter) {
    params.append("filter", JSON.stringify(filter));
  }
  if (sortBy) {
    params.append("sortBy", JSON.stringify(sortBy));
  }
  if (page) {
    params.append("page", page);
  }

  const res = await Axios({
    ...SummaryApi.bookings.getBookings(params.toString()),
  });

  if (!res.data.success) {
    throw new Error(res.data.message);
  }

  // Transform data to match frontend expectations
  const data = res.data.data.map((booking) => ({
    ...booking,
    id: booking._id,
    cabins: booking.cabinId || { name: "Deleted Cabin" },
    guests: booking.guestId || { fullName: "Deleted Guest", email: "" },
    created_at: booking.createdAt,
  }));

  return { data, count: res.data.count };
}

export async function getBooking(id) {
  const res = await Axios({
    ...SummaryApi.bookings.getBooking(id),
  });
  console.log(res.data);

  return res.data.data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const res = await Axios({
    ...SummaryApi.bookings.getBookingsAfterDate,
    data: { date },
  });

  return res.data.data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const res = await Axios({
    ...SummaryApi.bookings.getStaysAfterDate,
    data: { date },
  });
  console.log(res.data.data);

  return res.data.data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const res = await Axios({
    ...SummaryApi.bookings.getStayTodaysActivity,
  });

  return res.data.data;
}

export async function updateBooking(id, obj) {
  const res = await Axios({
    ...SummaryApi.bookings.updateBooking,
    data: { id, obj },
  });

  return res.data.data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const res = await Axios({
    ...SummaryApi.bookings.deleteBooking(id),
  });

  return res.data.data;
}
