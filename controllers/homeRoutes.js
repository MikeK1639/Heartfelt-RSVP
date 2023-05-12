const router = require("express").Router();
const { Event, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("landing-page", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/event", async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { user_id: req.session.user_id },
    });

    // Convert the array of Event objects to an array of plain JavaScript objects
    const eventData = await events.map((event) => {
      return event.get({ plain: true });
    });

    console.log(eventData);

    res.render("add-event", {
      events: eventData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/guest-rsvp", withAuth, async (req, res) => {
  try {
    res.render("guest-list");
  } catch (err) {
    console.log(err);
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
  res.render("signup");
});

module.exports = router;
