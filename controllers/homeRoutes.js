const router = require("express").Router();
const { Events, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render("landing-page");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {

  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect("/dashboard");
  //   return;
  // }
  res.render("signup");
});

module.exports = router;