import mongoose from "mongoose";

const cabinsSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    maxCapacity: { type: String, default: "" },
    regularPrice: { type: Number, default: "" },
    discount: { type: Number, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);
const CabinModel = mongoose.model("cabins", cabinsSchema);
export default CabinModel;
