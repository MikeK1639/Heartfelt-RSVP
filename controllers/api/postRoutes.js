const router = require("express").Router();
const { User, Guest } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/guest-rsvp/:id", async (req, res) => {
  try {
    res.render("guest-rsvp", {id: req.params.id});
  } catch (err) {
    console.log(err);
  }
});

router.patch("/guest-rsvp/", async (req, res) => {
  console.log(
    "++++++++++++++++++++++++++++++++++++++++++\nUpdating attending..."
  );
  try {
    const guest_name = req.body.guestName;
    const attendingStr = req.body.attending; // add this line to get the value of the selected option
    const attendingBool = attendingStr === "true" ? true : false;

    const guest = await Guest.findOne({ where: { guest_name: guest_name, event_id: req.body.event_id } });

    if (!guest) {
      return res.status(404).send("Guest not found");
    }

    await guest.update({ attending: attendingBool });
    res.status(200).send("Guest RSVP updated successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    console.log(postData);
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("post", {
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/guest-list", async (req, res) => {
  try {
    const guestData = await Guest.create({
      guest_name: req.body.newGuest,
      user_id: req.session.user_id,
      event_id: req.body.event_id,
    });

    console.log(guestData);
    if (!guestData) {
      return res.status(400).send("Guest name is required."); // Return an error if the name is missing
    }
    return res.status(201).send("Guest added successfully."); // Return a success message
  } catch (err) {
    console.error(err);
    return res.status(500).send(err); // Return an error message
  }
});

module.exports = router;
