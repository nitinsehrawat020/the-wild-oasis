export const BASE_URL = "http://localhost:3000";

export const SummaryApi = {
  user: {
    register: {
      url: "api/v1/user/signup",
      method: "POST",
    },
    login: {
      url: "api/v1/user/login",
      method: "POST",
    },
    logout: {
      url: "api/v1/user/logout",
      method: "get",
    },
    currentSession: {
      url: "api/v1/user/getCurrentSession",
      method: "get",
    },
    updateUser: {
      url: "api/v1/user/updateUser",
      method: "POST",
    },
    refreshToken: {
      url: "api/v1/user/refreshToken",
      method: "POST",
    },
  },
  bookings: {
    getBooking: (bookingId) => ({
      url: `api/v1/booking/getBooking/${bookingId}`,
      method: "GET",
    }),
    getBookings: (params) => ({
      url: `api/v1/booking/getBookings?${params}`,
      method: "GET",
    }),
    getBookingsAfterDate: {
      url: `api/v1/booking/getBookingsAfterDate`,
      method: "POST",
    },
    getStaysAfterDate: {
      url: `api/v1/booking/getStaysAfterDate`,
      method: "POST",
    },
    getStayTodaysActivity: {
      url: `api/v1/booking/getStayTodaysActivity`,
      method: "GET",
    },
    updateBooking: {
      url: "api/v1/booking/updateBooking",
      method: "POST",
    },
    deleteBooking: (bookingId) => ({
      url: `api/v1/booking/deleteBooking/${bookingId}`,
      method: "DELETE",
    }),
  },
  cabins: {
    getCabins: {
      url: "api/v1/cabin/getCabins",
      method: "GET",
    },
    createCabin: {
      url: "api/v1/cabin/createCabin",
      methos: "POST",
    },
    editCabin: (cabinId) => ({
      url: `api/v1/cabin/editCabin/${cabinId}`,
      methos: "POST",
    }),
    deleteCabin: (cabinId) => ({
      url: `api/v1/cabin/deleteCabin/${cabinId}`,
      method: "DELETE",
    }),
  },
  settings: {
    getSettings: {
      url: "api/v1/setting/getSetting",
      method: "GET",
    },
    patchSettings: {
      url: "api/v1/setting/updateSetting",
      method: "PATCH",
    },
  },
};
