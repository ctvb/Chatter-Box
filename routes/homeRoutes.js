const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
});

router.get('/login', withAuth, (req, res) => {
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
  res.render('chatboard');
  return;
});



module.exports = router;
