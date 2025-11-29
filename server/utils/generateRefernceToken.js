import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.module.js";
dotenv.config();

const generateRefernceToken = async (userId) => {
  try {
    const secret = process.env.JWT_REFERNCE_TOKEN;
    if (!secret) {
      throw new Error("refresh token is not defined");
    }

    const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });

    const updatedRefreshToken = await UserModel.updateOne(
      { _id: userId },
      { refreshToken: token }
    );

    return token;
  } catch (error) {
    console.error("Error in genertaing the refernce token ");
    throw error;
  }
};

export default generateRefernceToken;
