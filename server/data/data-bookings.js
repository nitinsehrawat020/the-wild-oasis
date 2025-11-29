import { add } from "date-fns";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
}

// Cabin IDs from database
const CABIN_IDS = {
  1: "6924e5cc292775533d63b11a",
  2: "6924e5cc292775533d63b11b",
  3: "6924e5cc292775533d63b11c",
  4: "6924e5cc292775533d63b11d",
  5: "6924e5cc292775533d63b11e",
  6: "6924e5cc292775533d63b11f",
  7: "6924e5cc292775533d63b120",
  8: "6924e5cc292775533d63b121",
};

// Guest IDs from database
const GUEST_IDS = {
  1: "6926d4f837dc82194763b114",
  2: "6926d4f837dc82194763b115",
  3: "6926d4f837dc82194763b116",
  4: "6926d4f837dc82194763b117",
  5: "6926d4f837dc82194763b118",
  6: "6926d4f837dc82194763b119",
  7: "6926d4f837dc82194763b11a",
  8: "6926d4f837dc82194763b11b",
  9: "6926d4f837dc82194763b11c",
  10: "6926d4f837dc82194763b11d",
  11: "6926d4f837dc82194763b11e",
  12: "6926d4f837dc82194763b11f",
  13: "6926d4f837dc82194763b120",
  14: "6926d4f837dc82194763b121",
  15: "6926d4f837dc82194763b122",
  16: "6926d4f837dc82194763b123",
  17: "6926d4f837dc82194763b124",
  18: "6926d4f837dc82194763b125",
  19: "6926d4f837dc82194763b126",
  20: "6926d4f837dc82194763b127",
  21: "6926d4f837dc82194763b128",
  22: "6926d4f837dc82194763b129",
  23: "6926d4f837dc82194763b12a",
  24: "6926d4f837dc82194763b12b",
  25: "6926d4f837dc82194763b12c",
  26: "6926d4f837dc82194763b12d",
  27: "6926d4f837dc82194763b12e",
  28: "6926d4f837dc82194763b12f",
  29: "6926d4f837dc82194763b130",
  30: "6926d4f837dc82194763b131",
};

export const bookings = [
  // CABIN 001
  {
    startDate: fromToday(0),
    endDate: fromToday(7),
    cabinId: CABIN_IDS[1],
    guestId: GUEST_IDS[2],
    hasBreakfast: true,
    observations:
      "I have a gluten allergy and would like to request a gluten-free breakfast.",
    isPaid: false,
    numGuests: 1,
  },
  {
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    cabinId: CABIN_IDS[1],
    guestId: GUEST_IDS[3],
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  {
    startDate: fromToday(12),
    endDate: fromToday(18),
    cabinId: CABIN_IDS[1],
    guestId: GUEST_IDS[4],
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 2,
  },

  // CABIN 002
  {
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    cabinId: CABIN_IDS[2],
    guestId: GUEST_IDS[5],
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  {
    startDate: fromToday(-2),
    endDate: fromToday(4),
    cabinId: CABIN_IDS[2],
    guestId: GUEST_IDS[6],
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 2,
  },
  {
    startDate: fromToday(8),
    endDate: fromToday(12),
    cabinId: CABIN_IDS[2],
    guestId: GUEST_IDS[7],
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 1,
  },

  // CABIN 003
  {
    startDate: fromToday(-5),
    endDate: fromToday(8),
    cabinId: CABIN_IDS[3],
    guestId: GUEST_IDS[8],
    hasBreakfast: true,
    observations:
      "My wife has a gluten allergy so I would like to request a gluten-free breakfast if possible.",
    isPaid: true,
    numGuests: 4,
  },
  {
    startDate: fromToday(14),
    endDate: fromToday(18),
    cabinId: CABIN_IDS[3],
    guestId: GUEST_IDS[9],
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  {
    startDate: fromToday(-6),
    endDate: fromToday(-4),
    cabinId: CABIN_IDS[3],
    guestId: GUEST_IDS[10],
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 3,
  },

  // CABIN 004
  {
    startDate: fromToday(-12),
    endDate: fromToday(-5),
    cabinId: CABIN_IDS[4],
    guestId: GUEST_IDS[11],
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 4,
  },
  {
    startDate: fromToday(3),
    endDate: fromToday(9),
    cabinId: CABIN_IDS[4],
    guestId: GUEST_IDS[12],
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 3,
  },

  // CABIN 005
  {
    startDate: fromToday(-18),
    endDate: fromToday(-10),
    cabinId: CABIN_IDS[5],
    guestId: GUEST_IDS[13],
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 5,
  },
  {
    startDate: fromToday(1),
    endDate: fromToday(7),
    cabinId: CABIN_IDS[5],
    guestId: GUEST_IDS[14],
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 6,
  },

  // CABIN 006
  {
    startDate: fromToday(-30),
    endDate: fromToday(-22),
    cabinId: CABIN_IDS[6],
    guestId: GUEST_IDS[15],
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 6,
  },
  {
    startDate: fromToday(5),
    endDate: fromToday(11),
    cabinId: CABIN_IDS[6],
    guestId: GUEST_IDS[16],
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 5,
  },

  // CABIN 007
  {
    startDate: fromToday(-40),
    endDate: fromToday(-33),
    cabinId: CABIN_IDS[7],
    guestId: GUEST_IDS[17],
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 8,
  },
  {
    startDate: fromToday(-10),
    endDate: fromToday(-3),
    cabinId: CABIN_IDS[7],
    guestId: GUEST_IDS[18],
    hasBreakfast: false,
    observations: "",
    isPaid: true,
    numGuests: 7,
  },
  {
    startDate: fromToday(10),
    endDate: fromToday(16),
    cabinId: CABIN_IDS[7],
    guestId: GUEST_IDS[19],
    hasBreakfast: true,
    observations: "",
    isPaid: false,
    numGuests: 8,
  },

  // CABIN 008
  {
    startDate: fromToday(-50),
    endDate: fromToday(-42),
    cabinId: CABIN_IDS[8],
    guestId: GUEST_IDS[20],
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 10,
  },
  {
    startDate: fromToday(-15),
    endDate: fromToday(-8),
    cabinId: CABIN_IDS[8],
    guestId: GUEST_IDS[21],
    hasBreakfast: true,
    observations: "",
    isPaid: true,
    numGuests: 9,
  },
  {
    startDate: fromToday(6),
    endDate: fromToday(13),
    cabinId: CABIN_IDS[8],
    guestId: GUEST_IDS[22],
    hasBreakfast: false,
    observations: "",
    isPaid: false,
    numGuests: 10,
  },
];
