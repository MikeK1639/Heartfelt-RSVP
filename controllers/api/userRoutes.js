const router = require("express").Router();
const { error } = require("jquery");
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

router.get("/guest-list", (req, res) => {
  
  // {
      // const guestData = 
      Guest.findAll()  
       .then(dbData =>{
        res.json(dbData)
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error", err
        });
      });
      //   }
      // })
      // .then(dbData =>{
      //   if(!dbData){
      //     res.status(404).json ({message:'no guest found'})
      //     return
      //   } else {
      //     res.status(200).json(guestData)
      //     return
      //   }
      //   const post = dbData.get({plain:true})
      // }) 
      
      // console.log(userData);
      // const post = guestData.get({ plain: true });
      // console.log(user);
      // res.render('post', {
      //   post
      // });
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json(err);
    // }
});
 
  


module.exports = router;


const express = require('express');

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

// ::::: Signup form button on signup page :::::
// $("#logout-btn").click(logoutHandler);