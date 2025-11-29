import { Router } from "express";

import locallyUpload from "../middleware/localMulter.js";
import {
  createCabin,
  deleteCabin,
  editCain,
  getCabins,
} from "../controller/cabin.controller.js";
import auth from "../middleware/auth.js";

const cabinRouter = Router();

cabinRouter.get("/getCabins", auth, getCabins);
cabinRouter.post(
  "/createCabin",
  auth,
  locallyUpload.single("image"),
  createCabin
);
cabinRouter.put(
  "/editCabin/:cabinId",
  auth,
  locallyUpload.single("image"),
  editCain
);

cabinRouter.delete("/deleteCabin/:cabinId", auth, deleteCabin);

export default cabinRouter;
