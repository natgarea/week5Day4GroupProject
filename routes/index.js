const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.use('/auth', authRoutes);
router.use('/profile', profileRoutes)

module.exports = router;
