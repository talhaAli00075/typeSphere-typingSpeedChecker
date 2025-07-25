const User = require("../models/User");
 const Result = require("../models/Results");


const saveResult = async (req, res) => {
  try {
    const { wpm, accuracy, totalTyped, wrongTyped, timer, userId } = req.body;

    const result = await Result({
      userId,
      wpm,
      accuracy,
      totalTyped,
      wrongTyped,
      timer
    }).save();

    res.status(201).json({
      success: true,
      message: "Result saved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save result",
      error: error.message
    });
  }
}

module.exports = {
  saveResult
};

