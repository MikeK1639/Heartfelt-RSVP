const router = require("express").Router();
const { User, Guest } = require("../../models");

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

router.get("/guest-list", async (req, res) => {
  try {
    const guestData = await Guest.findAll();
    const invited = guestData.map((guest) => guest.get({ plain: true }));

    res.render("guest-list", {
      invited,
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

module.exports = router;
