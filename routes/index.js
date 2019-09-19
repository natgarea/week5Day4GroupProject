const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth');
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.use('/auth', authRoutes);

module.exports = router;
