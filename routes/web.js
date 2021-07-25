const homeController = require("../app/http/controllers/homeContoller");
const UserController = require("../app/http/controllers/UserController");
const guest = require("../app/http/middleware/guest");
function initRoutes(app) {
  app.get("/login", guest, UserController().loginScreen);
  app.get("/register", guest, UserController().signupScreen);
  app.get("/dashboard", homeController().index);
  app.post("/register", UserController().registerUser);
  app.post("/login", UserController().loginUser);
  app.post("/logout", UserController().logout);
  app.get("/", UserController().index);
}

module.exports = initRoutes;
