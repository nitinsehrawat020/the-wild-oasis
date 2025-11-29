import bcrypt from "bcryptjs";

import UserModel from "../models/user.module.js";
import generateRefernceToken from "../utils/generateRefernceToken.js";
import generateAccessToken from "../utils/generateAcessToken.js";
import uploadImageCloundary from "../utils/uploadCloundary.js";
import jwt from "jsonwebtoken";

export async function signupUserController(req, res) {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({
        message: "kindly provide all the details",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(200).json({
        message:
          "email already used to signup kindly login or reset your password",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(16);
    const hashedpassword = await bcrypt.hash(password, salt);

    const payload = {
      email: email,
      password: hashedpassword,
      fullName: fullName,
    };
    const newUser = new UserModel(payload);
    const savedUser = await newUser.save();

    //send mail confirmation code

    if (!savedUser) {
      return res.status(400).json({
        message: "internal server error",
        success: false,
        error: true,
      });
    }

    return res.status(201).json({
      message: "User created sucessfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Kindly provide email and password ",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "there is no user exit with this email",
        success: false,
        error: true,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
        error: true,
      });
    }

    const refernceToken = await generateRefernceToken(user._id);
    const accessToken = generateAccessToken(user._id);

    const isProduction = process.env.NODE_ENV === "production";
    const cookiesOption = {
      httpOnly: false, // Allow client JS to read it
      secure: isProduction, // HTTPS in production
      sameSite: isProduction ? "None" : "Lax", // None for cross-origin in production
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refernceToken", refernceToken, cookiesOption);
    return res.status(200).json({
      message: "user login successfully",
      error: false,
      success: true,
      data: {
        user: { fullname: user.fullName, avatar: user.avatar },
        session: true,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function currentSessionController(req, res) {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
        error: true,
      });
    }
    const payload = {
      email: user.email,
      user_metadata: {
        fullName: user.fullName,
        avatar: user.avatar,
      },
      session: user.refreshToken ? true : false,
    };

    return res.status(200).json({
      message: "user data retrived",
      success: true,
      error: false,
      data: payload,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req.heade?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res.status(400).json({
        message: "invalid token",
        success: false,
        error: true,
      });
    }
    const verifyToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFERNCE_TOKEN
    );

    if (!verifyToken) {
      return res.status(400).json({
        message: "invalid token",
        success: false,
        error: true,
      });
    }

    const userId = verifyToken.userId;
    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    const newAccessToken = await generateAccessToken(userId);
    res.cokkie("accessToken", newAccessToken, cookiesOptions);
    return res.status(200).json({
      message: "access token created successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
export async function logoutUserController(req, res) {
  try {
    const userId = req.userId;
    const cokkiesOption = {
      httpOnly: false,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.clearCookie("accessToken", cokkiesOption);
    res.clearCookie("refreshToken", cokkiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { refreshToken: "" }
    );
    return res.status(200).json({
      message: "Logout Successfully",
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

export async function updateUserController(req, res) {
  try {
    const userId = req.userId;
    const { password, fullName } = req.body;
    const avatarimage = req.files;
    let updatedUser;

    if (avatarimage[0]) {
      const upload = await uploadImageCloundary(avatarimage[0], "avatar");

      updatedUser = await UserModel.findByIdAndUpdate(
        { _id: userId },
        { avatar: upload?.secure_url }
      );
    }

    if (fullName) {
      updatedUser = await UserModel.findByIdAndUpdate(
        { _id: userId },
        { fullName: fullName }
      );
    }
    if (password) {
      const salt = await bcrypt.genSalt(16);
      const hashedPassword = await bcrypt.hash(password, salt);

      updatedUser = await UserModel.findByIdAndUpdate(
        { _id: userId },
        { password: hashedPassword }
      );
    }
    return res.status(200).json({
      message: "User updated succcessfully",
      success: true,
      error: false,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
