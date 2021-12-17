const User = require("../../models/user");

function homeController() {
  return {
    index(req, res) {
      return res.render("dashboard", { title: "Dashboard" });
    },
    async sendChartData(req, res) {
      const user = await User.findById(req.session.passport.user).populate("devices");

      //adding dates to array
      let readings = user.devices[0].voltageReadings.slice(-10);
      const labels = [];
      readings.forEach((reading) => {
        labels.push(reading.date);
      });

      //pushing the corresponding readings to the values;
      const units = [];

      for (const date of labels) {
        let currentDateUnits = 0;
        for (device of user.devices) {
          let obj = await device.unitsConsumed.find((o) => o.date === date);
          currentDateUnits = currentDateUnits + obj.units;
        }
        units.push(currentDateUnits);
      }

      //labels done + units done
      let finalData = { labels, units };

      return res.json(finalData);
    },
  };
}

module.exports = homeController;
