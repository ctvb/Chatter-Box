const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/chat');
    return;
  } else {
    res.render('login');
  }

});

router.get('/signup', (req, res) => {
  res.render('signup');
  return;
});

router.get('/chat', (req, res) => {
  if (req.session.logged_in) {
  res.render('chatboard', {
    logged_in: req.session.logged_in,
    username: req.session.username
  });
  return;
}
else {
    res.render('login');
}
});

// Used to verify contents of session
router.get('/check-session', (req, res) => {
  console.log(req.session);
  res.send('Session checked');
});



module.exports = router;
