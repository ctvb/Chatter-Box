const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoute');

router.use('/api', apiRoutes);
router.use('/users', userRoutes)
router.use('/', homeRoutes);

module.exports = router;