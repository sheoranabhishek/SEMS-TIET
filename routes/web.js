const homeController = require("../app/http/controllers/homeContoller");
const UserController = require("../app/http/controllers/UserController");
const guest = require("../app/http/middleware/guest");
const deviceController = require("../app/http/controllers/deviceController");
function initRoutes(app) {
  app.get("/add-device", deviceController().add);
  app.post("/add-device", deviceController().postAdd);
  app.post("/create-device", deviceController().createDevice);
  app.post("/data-major", deviceController().addMajorData);
  app.get("/get-chart-data", homeController().sendChartData);
  app.get("/login", guest, UserController().loginScreen);
  app.get("/register", guest, UserController().signupScreen);
  app.get("/dashboard", homeController().index);
  app.get("/:id1/:id2", deviceController().oneDevice);
  app.post("/register", UserController().registerUser);
  app.post("/login", UserController().loginUser);
  app.post("/logout", UserController().logout);
  app.get("/", UserController().index);
}

module.exports = initRoutes;
