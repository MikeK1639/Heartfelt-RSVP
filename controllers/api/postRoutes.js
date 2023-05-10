const router = require("express").Router();
const { Post, User, Guest } = require("../../models");

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try
  {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          }
        ],
      });

      console.log(postData);
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('post', {
        post
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
router.post('/guest', async (req, res) => {
  try {
    const guestData = await Guest.create({
      guest_name: req.body.guest_name,
      user_id : req.body.user_id
    }); 
    console.log(guestData);
    if (!guestData) {
      return res.status(400).send('Guest name is required.'); // Return an error if the name is missing
    }
    await heartfelt_db.addGuest(guestData.guest_name); // Add the guest name to the database
    return res.status(201).send('Guest added successfully.'); // Return a success message
  } catch (err) {
    console.error(err);
    return res.status(500).send(err); // Return an error message
  }
});

module.exports = router;
