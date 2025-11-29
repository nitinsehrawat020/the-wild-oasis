import settingModel from "../models/settings.module.js";

export async function getsetting(req, res) {
  try {
    const settingsData = await settingModel.find().lean();

    if (!settingsData || settingsData.length === 0) {
      return res.status(404).json({
        message: "setting not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "data sent",
      success: true,
      error: false,
      data: settingsData,
    });
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function updateSetting(req, res) {
  try {
    const { newSetting } = req.body;
    if (!newSetting || Object.keys(newSetting).length === 0) {
      return res.status(400).json({
        message: "no setting data provided",
        success: false,
        error: true,
      });
    }

    const updatedsetting = await settingModel.findByIdAndUpdate(
      "6926cd0737dc82194763b113",
      { $set: newSetting },
      { new: true, runValidators: true }
    );

    console.log("Updated setting:", updatedsetting);

    if (!updatedsetting) {
      return res.status(404).json({
        message: "setting not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "updated successfully",
      success: true,
      error: false,
      data: updatedsetting,
    });
  } catch (error) {
    console.error("Update setting error:", error);

    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
