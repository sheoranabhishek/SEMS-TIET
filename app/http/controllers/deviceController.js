const User = require("../../models/user");
const Device = require("../../models/device");
function UserController() {
  return {
    async add(req, res) {
      return res.render("add-devices");
    },
    async postAdd(req, res) {
      const { userId, deviceId, deviceName, room , description } = req.body;

      if (!userId || !deviceId || !deviceName ) {
        req.flash("error", "Fill all the mandatory fields.");
        return res.redirect("/add-device");
      }

      const device = await Device.findOne({ deviceId: deviceId });
      if (!device) {
        req.flash("error", "Invalid device id!");
        return res.redirect("/add-device");
      }
      else{
        if( device.owner != "")
        {
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

      await Device.findOneAndUpdate({deviceId: deviceId} , newDevice , null , (err , res)=>{
          if( err)
          {
            console.log(err);
          }
          else{
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
  };
}

module.exports = UserController;
