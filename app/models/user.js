//represents the database table users
const mongoose = require("mongoose");
const Device = require("./device");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true }],
  totalUnits: [{ date: String, unitsConsumed: Number }],
  totalCosts: [{ date: String, costCalculated: Number }],
  predictions: [{ predictedUnits: Number }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
