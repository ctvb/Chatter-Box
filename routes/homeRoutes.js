const router = require('express').Router();

router.get('/', (req, res) => {
 
  if (req.session.logged_in) {
    res.redirect('/chat');
  } else {
    res.render('homepage');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
  return;
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
