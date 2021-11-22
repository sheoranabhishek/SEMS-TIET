//represents the database table users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const deviceSchema = new Schema({
  deviceId: { type: String, required: true },
  deviceName: { type: String, required: true , default: "DeviceNameDefault"  },
  room: { type: String, required: true , default: "None" },
  owner:{type: String , default:""},
  description: { type: String, required: true , default: "None" },
});

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
