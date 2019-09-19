const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Picture = require("../models/Picture");
const upload = require("../configs/cloudinary.config");

let transporter = require("../configs/nodemailer.config");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", upload.single('photo'), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const { originalname, url } = req.file;
  console.log(req.file)
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Indicate email, username and password"
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }

    const newUser = new User({
      email,
      username,
      password: hashPass,
      status: "Pending confirmation",
      confirmationCode: token
      // profilePicture:
    });

    newUser
      .save()
      .then(() => {
        transporter
          .sendMail({
            from: "Ironhackers Group 1",
            to: email,
            subject: "Confirmation email",
            text: "Confirmation email",
            html: `<a href="http://localhost:3000/auth/confirm/${token}">Haz click para confirmar tu cuenta</a>`
          })
          .then(() => res.redirect("/auth/login"))
         
      })
      .catch(err => {
        console.log(err);
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

router.get("/confirm/:token", (req, res, next) => {

  User.findOneAndUpdate({confirmationCode:req.params.confirmCode},{$set:{active:true}},{new: true})
  
  const token = req.params.token;
  User.findOneAndUpdate({confirmationCode: token}, {$set: {status: 'Active'}}, {new: true})
    .then(activeUser => {
      if(activeUser) {
        res.render("auth/confirmation");
      } else {
        res.render("auth/wrongToken");
      }
    })
    .catch((error) => {console.log(error);
    })
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
