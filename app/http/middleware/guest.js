function guest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.render("dashboard", { pageTitle: "Dashboard", title: req.session.passport.user });
}

module.exports = guest;
