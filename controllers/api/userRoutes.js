const router = require("express").Router();
const { User } = require("../../models");

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

router.get("/guest-list", (req, res) => {
  res.render("guest-list");
});

module.exports = router;
