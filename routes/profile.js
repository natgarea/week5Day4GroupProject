const express = require("express");

const router = express.Router();
const User = require("../models/User");
const Picture = require("../models/Picture");
const upload = require("../configs/cloudinary.config");

const secureMiddlewares = require('../middlewares/secure.mid');

router.get("/", secureMiddlewares.checkUser , (req,res, next)=>{
  const user = req.user;
  res.render("profile/index", {user});
})

module.exports = router;