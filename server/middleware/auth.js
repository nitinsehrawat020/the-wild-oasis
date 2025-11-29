import jwt from "jsonwebtoken";
import UserModel from "../models/user.module.js";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "authentication required",
        error: true,
        success: false,
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      req.userId = decode.userId;

      const user = await UserModel.findById(decode.userId);

      next();
    } catch (jwtError) {
      console.error("JWT verfication failed", jwtError.message);
      return res.status(401).json({
        message: "invalid or expired token",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.error("auth middleware error :", error);
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export default auth;
