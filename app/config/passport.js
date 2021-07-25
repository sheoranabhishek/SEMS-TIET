const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");
function init(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      //login

      //check if email exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "The email is not registered." });
      }

      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            return done(null, user, { message: "Logged in successfully." });
          }
          return done(null, false, { message: "Password is wrong." });
        })
        .catch((err) => {
          return done(null, false, { message: "Something went wrong." });
        });
    })
  );
  //store after login
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //logout
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
