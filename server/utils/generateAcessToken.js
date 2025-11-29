import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (userId) => {
  try {
    const secret = process.env.JWT_ACCESS_TOKEN;
    if (!secret) {
      throw new Error("Acess toekn secret is not defined");
    }

    const token = jwt.sign({ userId }, secret, { expiresIn: "1d" });
    if (!token) {
      throw new Error("error in generating the access token");
    }

    return token;
  } catch (error) {}
};

export default generateAccessToken;
