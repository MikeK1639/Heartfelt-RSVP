const withAuth = (req, res, next) => {
  // redirect if user not logged in
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
