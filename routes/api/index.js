const router = require('express').Router();
const chatRoutes = require('./chatRoute');
const userRoutes = require('./userRoute');

// router.use('/chat', chatRoutes);
router.use('/user', userRoutes);

module.exports = router;
