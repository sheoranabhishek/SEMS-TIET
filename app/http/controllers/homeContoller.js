const User = require("../../models/user");

function homeController() {
  return {
    index(req, res) {
      return res.render("dashboard", { title: "Dashboard" });
    },
  };
}

module.exports = homeController;
