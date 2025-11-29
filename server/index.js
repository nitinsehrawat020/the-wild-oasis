import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgon from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
import path from "path";

import connectDb from "./config/connectDb.js";
import userRouter from "./router/user.route.js";
import bookingsRouter from "./router/bookings.route.js";
import cabinRouter from "./router/cabin.route.js";
import settingRouter from "./router/settings.route.js";
import {
  refreshBookingData,
  startBookingRefreshCron,
} from "./utils/cronJobs.js";

// Import models to ensure they are registered
import "./models/guests.module.js";
import "./models/bookings.module.js";
import "./models/cabins.module.js";
import "./models/settings.module.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://the-wild-oasis-blue-six.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgon("dev"));
app.use(helmet({ contentSecurityPolicy: false }));

// Serve static files with CORS headers
app.use(
  "/uploads",
  (req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:5173",
      process.env.FRONTEND_URL
    );
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/booking", bookingsRouter);
app.use("/api/v1/cabin", cabinRouter);
app.use("/api/v1/setting", settingRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hello from server",
    success: "true",
    error: false,
  });
});

const PORT = 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is lisenting on the PORT ${PORT}`);

    // Start the cron job for automatic booking refresh
    startBookingRefreshCron();
  });
});
