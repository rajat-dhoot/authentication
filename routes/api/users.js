const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const validateSignUpInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");

router.post("/signup", (req, res) => {
   const { errors, isValid } = validateSignUpInput(req.body);
   const { name, email, password } = req.body;
   if (!isValid) {
      return res.status(400).json(errors);
   }
   User.findOne({ email }).then(user => {
      if (user) {
         return res.status(400).json({ email: "Email already exists" });
      } else {
         const newUser = new User({ name, email, password });
         // hashing password before storing it in database
         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               if (err) throw err;
               newUser.password = hash;
               newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
            });
         });
      }
   });
});

router.post("/login", (req, res) => {
   const { errors, isValid } = validateLoginInput(req.body);
   if (!isValid) {
      return res.status(400).json(errors);
   }
   const { email, password } = req.body;
   User.findOne({ email }).then(user => {
      if (!user) {
         return res.status(404).json({ email: "Email not found" });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
         if (isMatch) {
            const payload = {
               id: user.id,
               name: user.name
            };
            jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
               if (err) {
                  console.log(err);
               }
               return res.json({
                  success: true,
                  token: "Bearer " + token
               });
            });
         } else {
            return res.status(400).json({ password: "Password Incorrect" });
         }
      });
   });
});

module.exports = router;
