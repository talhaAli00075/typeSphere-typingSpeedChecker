const express = require("express");
const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wpm: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  totalTyped: { type: Number, required: true },
  wrongTyped: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Results = mongoose.model("Results", resultsSchema);

module.exports = Results;
