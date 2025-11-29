import { Router } from "express";

import {
  currentSessionController,
  loginUserController,
  logoutUserController,
  refreshToken,
  signupUserController,
  updateUserController,
} from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/signup", signupUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/getCurrentSession", auth, currentSessionController);
userRouter.get("/logout", auth, logoutUserController);
userRouter.get("/refreshToken", auth, refreshToken);
userRouter.post(
  "/updateUser",
  auth,
  upload.array("avatar", 10),
  updateUserController
);

export default userRouter;
