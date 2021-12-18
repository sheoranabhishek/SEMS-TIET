const User = require("../../models/user");
const Device = require("../../models/device");
function UserController() {
  return {
    async add(req, res) {
      return res.render("add-devices");
    },
    async postAdd(req, res) {
      const { userId, deviceId, deviceName, room, description } = req.body;

      if (!userId || !deviceId || !deviceName) {
        req.flash("error", "Fill all the mandatory fields.");
        return res.redirect("/add-device");
      }

      const device = await Device.findOne({ deviceId: deviceId });
      if (!device) {
        req.flash("error", "Invalid device id!");
        return res.redirect("/add-device");
      } else {
        if (device.owner != "") {
          req.flash("error", "The Device Has Already Been Taken By Someone!");
          return res.redirect("/add-device");
        }
      }

      const newDevice = {
        deviceId: deviceId,
        deviceName: deviceName,
        room: room,
        owner: userId,
        description: description,
      };

      await Device.findOneAndUpdate({ deviceId: deviceId }, newDevice, null, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully Updated.");
        }
      });

      //if device id is found , we store the id in user's devices array.
      const user = await User.findById(userId);
      if (user.devices.includes(device._id)) {
        req.flash("error", "Device has already been added.");
        return res.redirect("/add-device");
      }
      // var new_obj = {deviceId};
      // var new_dev = new Device(new_obj)
      // new_dev.save((err , res)=>{
      //   if( err)
      //   {
      //     console.log("Error in Saving");
      //   }
      //   else{
      //     console.log("Successfully Saved");
      //   }
      // })
      user.devices.push(device._id);
      User.updateOne({ _id: userId }, user, { upsert: false }).then((result) => {
        return res.redirect("/");
      });
    },
    async oneDevice(req, res) {
      const userId = req.params.id1;
      const deviceId = req.params.id2;
      if (userId === "js") {
        return res.redirect("/");
      }
      const device = await Device.findOne({ deviceId: deviceId });
      //check if the current deviceId is in the devices list of the user ?
      if (userId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        var user = await User.findById(userId).populate("devices");
        // if (user.devices.includes(device._id)) {
        //logic to display details of the individual device
        return res.render("oneDevice", { user: user, device: device });
        // }
      } else {
        return res.redirect("/");
      }
    },
    async createDevice(req, res) {
      const { deviceId, deviceName, room, owner, description, voltageReadings, currentReadings, hoursRunning, unitsConsumed, prediction } = req.body;
      console.log(deviceId);
      const device = new Device({
        deviceId: deviceId,
        deviceName: deviceName,
        room: room,
        owner: owner,
        description: description,
        voltageReadings: voltageReadings,
        currentReadings: currentReadings,
        hoursRunning: hoursRunning,
        unitsConsumed: unitsConsumed,
        prediction: prediction,
      });

      device.voltageReadings[0].readings.push(999);
      console.log(device);
      device.save((err, doc) => {
        if (err) {
          return console.error(err);
        }
        console.log("Successful");
      });
    },
    async addMajorData(req, res) {
      const { date, voltage, current, deviceId, userId } = req.body;

      console.log(req.body);

      if (voltage == 0 && current == 0) {
        //we donot add this to array.
        return res.redirect("/");
      }

      //find the user , its device and then add => voltage and readings to the data
      const device = await Device.findById(deviceId);
      let requiredIndex;
      for (var i = 0; i < device.voltageReadings.length; i++) {
        if (device.voltageReadings[i].date == date) {
          requiredIndex = i;
          break;
        }
      }
      device.voltageReadings[requiredIndex].readings.push(voltage);
      device.currentReadings[requiredIndex].readings.push(current);

      if (voltage != 0 && current != 0) {
        device.hoursRunning[requiredIndex].hours = device.hoursRunning[requiredIndex].hours + 0.167;
        device.prediction += 0.061;
      }
      device.unitsConsumed[requiredIndex].units = (voltage * current * device.hoursRunning[requiredIndex].hours) / 1000;
      var str = device.unitsConsumed[requiredIndex].units.toString(); //convert number to string
      var result = str.substring(0, 6); // cut six first character
      device.unitsConsumed[requiredIndex].units = parseFloat(result); // convert it to a number
      await device.save();
    },
    async getPrediction(req, res) {
      //collecting the data from flask application.
      var date = Date.now();
      var url = `https://semstietpredictions.herokuapp.com/${date}`;
      fetch(url, async (data, err) => {
        // Saving the data received , into the mongoDB predictions of each device.
        let devId = window.location.href;
        let dev = await Device.findById(devId);
        dev.prediction = data;
        Device.save();
      });
    },
  };
}

module.exports = UserController;
