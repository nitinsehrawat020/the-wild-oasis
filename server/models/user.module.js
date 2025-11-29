import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "please provide the fullName"] },
    email: {
      type: String,
      required: [true, "please provide the email"],
      index: true,
    },
    password: { type: String, required: [true, "please provide the password"] },
    avatar: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
    verifyEmail: { type: Boolean, default: false },
    forgetPaswordOtp: { type: String, default: "" },
    forgetPasswordExpire: { type: Date, default: "" },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
