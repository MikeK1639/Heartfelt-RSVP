const router = require("express").Router();
const { Post, User } = require("../../models");

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
    const guestData = await User.create({
      name: req.body.user,
      email: req.body.email,
      password: req.body.password,
    }); 
    if (!name) {
      return res.status(400).send('Guest name is required.'); // Return an error if the name is missing
    }
    await heartfelt_db.addGuest(name); // Add the guest name to the database
    return res.status(201).send('Guest added successfully.'); // Return a success message
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred while adding the guest.'); // Return an error message
  }
});

module.exports = router;
