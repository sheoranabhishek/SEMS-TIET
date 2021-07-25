const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
function createFlash(req) {
  const { firstName, lastName, userName, email, password, password_confirm } = req.body;
  req.flash("firstName", firstName);
  req.flash("lastName", lastName);
  req.flash("userName", userName);
  req.flash("email", email);
}

function UserController() {
  return {
    index(req, res) {
      if (req.session.passport.user) {
        return res.render("dashboard", { pageTitle: "Dashboard", title: req.session.passport.user });
      }
      return res.render("login", { layout: false, pageTitle: "SignIn" });
    },
    loginScreen(req, res) {
      return res.render("login", { layout: false, pageTitle: "SignIn" });
    },
    signupScreen(req, res) {
      return res.render("signup", { layout: false, pageTitle: "Register" });
    },
    async registerUser(req, res) {
      const { firstName, lastName, userName, email, password, password_confirm } = req.body;
      if (!firstName || !lastName || !userName || !email || !password || !password_confirm) {
        req.flash("error", "All Fields Are Mandatory");
        createFlash(req);
        return res.render("signup", { layout: false, pageTitle: "Register" });
      }

      if (password != password_confirm) {
        req.flash("error", "Password don't match. Try again.");
        return res.render("signup", { layout: false, pageTitle: "Register" });
      }
      const userfound = await User.findOne({ username: userName });
      if (userfound) {
        req.flash("error", "Username already taken");
        return res.render("signup", { layout: false, pageTitle: "Register" });
      }

      let name = firstName + lastName;
      let username = userName;
      const hashedpassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        username: userName,
        email: email,
        password: hashedpassword,
        devices: [],
      });

      newUser
        .save()
        .then((newUser) => {
          console.log("Successfully Registered!");
          return res.redirect("/signin");
        })
        .catch((err) => {
          req.flash("Something Went Wrong!");
          return res.redirect("/register");
        });
    },
    loginUser(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          console.log("Logged in : " + user.username);
          return res.redirect("/login");
        });
      })(req, res, next);
    },
    logout(req, res) {
      req.logout();
      return res.redirect("/login");
    },
  };
}

module.exports = UserController;
