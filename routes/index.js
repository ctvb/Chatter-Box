const router = require('express').Router();
const apiRoutes = require('./api');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chat');

router.use('/api', apiRoutes);
router.use('/userRoutes', userRoutes);
router.use('/chat', chatRoutes);


// router.use((req, res) => {
//     res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;