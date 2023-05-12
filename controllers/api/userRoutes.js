const router = require("express").Router();
const { User, Guest, Event } = require("../../models");

// ::::: New user created and written to database :::::
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.user,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      //* ::::: MUST SEND A RESPONSE :::::
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });

    // res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// ! ::::::: Log In ::::::::::
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    console.log("User Data:", userData);

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/contact", (req, res) => {
  res.render("contacts");
});

router.get("/guest-list/:id", async (req, res) => {
  try {
    const eventPk = await Event.findByPk(req.params.id, {
      include: [Guest],
    });
    const event = eventPk.get({ plain: true });

    // Convert the array of Event objects to an array of plain JavaScript objects
    //     const eventData = await events.map((event) => {
    //       return { event_name: event.event_name };
    //     });
    //
    //     const guests = await Guest.findAll({
    //       where: { user_id: req.session.user_id },
    //       attributes: ["guest_name", "attending"],
    //     });

    // Convert the array of Event objects to an array of plain JavaScript objects
    // const guestList = await guests.map((guest) => {
    //   console.log("++++++++++++++guest attending", guest.attending);
    //   return { guest_name: guest.guest_name, attending: guest.attending };
    // });
    console.log("+++++++++++++++++++++", event);
    res.render("guest-list", {
      event,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error", err });
  }
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      console.log("Session destroyed"); // for testing purposes only
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).send("You have been successfully logged out.");
      }
    });
  } else {
    res.end();
  }
});

router.post("/add-event", async (req, res) => {
  try {
    const userData = await Event.create({
      event_name: req.body.event_name,
      event_description: req.body.event_description,
      user_id: req.session.user_id,
    });
// 
//     req.session.save(() => {
//       req.session.user_id = userData.user_id;
//       req.session.logged_in = true;

      //* ::::: MUST SEND A RESPONSE :::::
      res.status(200).json({ user: userData, message: "Event added." });
    // });

//     const events = await Event.findAll({
//       where: { user_id: req.session.user_id },
//       attributes: ["event_name", "event_description", "event_id"],
//     });
// 
//     // Convert the array of Event objects to an array of plain JavaScript objects
//     const eventData = await events.map((event) => {
//       return { event_name: event.event_name };
//     });
// 
//     console.log("+++++++++++++++++++++++", eventData);
// 
//     res.render("add-event", {
//       events: eventData,
//       logged_in: req.session.logged_in,
//     });
    // res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
module.exports = router;
