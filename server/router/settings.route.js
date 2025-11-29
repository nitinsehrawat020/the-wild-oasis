import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  getsetting,
  updateSetting,
} from "../controller/settings.controller.js";

const settingRouter = Router();

settingRouter.get("/getSetting", auth, getsetting);
settingRouter.patch("/updateSetting", auth, updateSetting);

export default settingRouter;
