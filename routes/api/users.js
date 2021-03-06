const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
// Load User model
const User = require("../../models/User");
//Load Input validation 
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route GET api/users/test
// @desc test users route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Users Working fine!!!" }));

// @route POST api/users/register
// @desc register users
// @access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists"
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        })
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
    .catch(err => console.error(err));
});

// @route POST api/users/register
// @desc register users
// @access public
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      errors.email = 'User not found'
      if (!user) res.status(400).json(errors);

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar } // Create jwt payload
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 36000 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })
            // res.json({ msg: 'Success' })
          } else {
            errors.password = 'Password incorrect'
            res.status(400).json(errors)
          }
        })
    })
    .catch(err => console.error(err));
});

// @route GET api/users/current
// @desc return current users 
// @access public

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})
module.exports = router;
