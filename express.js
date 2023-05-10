const express = require('express');
const router = express.Router();

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200).send('You have been successfully logged out.');
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;