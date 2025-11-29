import CabinModel from "../models/cabins.module.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getCabins(req, res) {
  try {
    const cabinsData = await CabinModel.find().lean();

    if (!cabinsData || cabinsData.length === 0) {
      return res.status(404).json({
        message: "No cabins found",
        success: false,
        error: true,
      });
    }

    // Add full image URL to each cabin
    const cabinsWithImages = cabinsData.map((cabin) => ({
      ...cabin,
      image: `${process.env.SERVER_IP_ADDRESS}${cabin.image}`,
    }));

    return res.status(200).json({
      message: "data sent successfully",
      success: true,
      error: false,
      data: cabinsWithImages,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function createCabin(req, res) {
  try {
    const userId = req.userId;
    const file = req.file;
    const { name, maxCapacity, regularPrice, discount, description } = req.body;

    if (!name || !maxCapacity || !regularPrice || !discount || !description) {
      return res.status(400).json({
        message: "Provide all the neccasry details",
        success: false,
        error: true,
      });
    }
    if (!file) {
      return res.status(400).json({
        message: "Image cannot be found",
        success: false,
        error: true,
      });
    }

    const payload = {
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image: file.filename, // Store only filename, not full URL
    };

    const saveCabin = new CabinModel(payload);
    await saveCabin.save();

    return res.status(201).json({
      message: "Cabin added successfully",
      success: true,
      error: false,
      data: saveCabin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function editCain(req, res) {
  try {
    const file = req.file;
    const { cabinId } = req.param;
    const { name, maxCapacity, regularPrice, discount, description } = req.body;

    let imageName;
    const cabin = await CabinModel.findById(cabinId);

    if (!cabin) {
      return res.status(400).json({
        message: "Can't find the cabin",
        success: false,
        error: true,
      });
    }

    const lastImage = cabin.image;

    if (file) {
      imageName = file.filename;
    } else {
      imageName = cabin.image;
    }

    const updatedCabin = await CabinModel.updateOne(
      { _id: cabinId },
      {
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image: imageName,
      }
    );
    if (file && lastImage) {
      const oldImagePath = path.join(__dirname, "../uploads/cabins", lastImage);

      // Check if old image exists before deleting
      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted successfully:", lastImage);
          }
        });
      }
    }

    return res.status(200).json({
      message: "the cabin updated sucessfully",
      success: true,
      error: false,
      data: updatedCabin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function deleteCabin(req, res) {
  try {
    const { cabinId } = req.params;

    if (!cabinId) {
      return res.status(400).json({
        message: "can't find the cabin Id",
        success: false,
        error: true,
      });
    }
    const cabin = await CabinModel.findById(cabinId);

    if (!cabin) {
      return res.status(400).json({
        message: "can\t find cabin",
        success: false,
        error: true,
      });
    }
    const deletedCabin = await CabinModel.deleteOne({ _id: cabinId });

    if (cabin.image) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads/cabins",
        cabin.image
      );

      // Check if old image exists before deleting
      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted successfully:", cabin.image);
          }
        });
      }
    }
    return res.status(200).json({
      message: "dekleted sucessfully",
      success: true,
      error: false,
      data: deletedCabin,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
