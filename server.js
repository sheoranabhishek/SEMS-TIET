require("dotenv").config();
const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
// databse connection
const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
// connection
//   .once("open", () => {
//     console.log("Database Connected");
//   })
//   .catch((err) => {
//     console.log("Connection Failed");
//   });

//Session Config
app.use(
  session({
    secret: process.env.COOKIE_SECRET, //for cookies,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl: url,
      mongooseConnection: mongoose.connection,
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 68 * 24 }, //24 hours
  })
);

//Passport Config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global Middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//Set Template Engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//Routes
require("./routes/web")(app);

//Listening to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
