const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const Post = require('../models/Post')
const Comment = require('../models/Comment')

/* GET home page */
router.get('/', (req, res, next) => {
  if (!req.user) {
    req.user= false;
  }
  const user = req.user
  Post.find().sort('createdAt').populate('creatorId').populate('comments').then(selectedPost => { console.log(selectedPost)
    res.render('index', { selectedPost, user })
  })
  
  
});


router.use('/auth', authRoutes);
router.use('/profile', profileRoutes)

module.exports = router;
