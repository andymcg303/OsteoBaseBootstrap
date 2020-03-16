const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const { errorHandler } = require('../middleware');
const { postRegister } = require('../controllers');

const router = express.Router();

// Root Landing Page ie login
router.get('/', (req, res) => res.render('login'));

// Show Login Form
router.get('/login', (req, res) => res.render('login'));

// Show Sign Up Form
router.get('/signup', (req, res) => res.render('signup'));

// Handle Signup Logic
router.post('/signup', errorHandler(postRegister));

// // Handle Login Logic
router.post('/login', passport.authenticate('local',
    {
      successRedirect: '/patients',
      failureRedirect: '/login',
      // failureFlash: true,
      // successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    }
));

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
