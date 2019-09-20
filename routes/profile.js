const express = require("express");

const router = express.Router();
const Post = require("../models/Post");
const upload = require("../configs/cloudinary.config");
const Comment = require('../models/Comment')

const secureMiddlewares = require('../middlewares/secure.mid');
router.all("/*", secureMiddlewares.checkUser)
router.get("/" , (req,res, next)=>{
  const user = req.user;
  res.render("profile/index", {user});
})

router.get("/addPost", (req, res) => {
  res.render("profile/addPost")
}) 

router.post("/addPost", upload.single('photo'), (req, res) => {

  const {content, picName} = req.body;
  const {secure_url} = req.file;

  const newPost = new Post({
    content,
    creatorId: req.user._id,
    picPath: secure_url,
    picName
  });

  newPost
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.render("auth/login", { message: "Something went wrong" });
    });
}) 


router.post("/addComment", upload.single('photo'), (req, res) => {
  
  const secure_url = (req.file && req.file.secure_url)?req.file.secure_url: false;
  const {content, picName, postId} = req.body;

  const newComment = new Comment({
    content,
    authorId: req.user._id,
    picPath: secure_url,
    picName
  });

  newComment
    .save()
    .then((comment) => {

      Post.findByIdAndUpdate(postId, { $push: {comments: comment._id}})
        .then(() => res.redirect("/"))
        .catch((error) => next(error))

    })
    .catch(err => {
      console.log(err);
      res.render("auth/login", { message: "Something went wrong" });
    });
}) 

module.exports = router;