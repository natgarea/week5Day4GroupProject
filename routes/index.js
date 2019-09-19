const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const Post = require('../models/Post')

/* GET home page */
router.get('/', (req, res, next) => {
  const posts = [];
  Post.find().sort('createdAt').then(selectedPost => {
    res.render('index', { selectedPost })
  })
  
});


router.use('/auth', authRoutes);
router.use('/profile', profileRoutes)

module.exports = router;
