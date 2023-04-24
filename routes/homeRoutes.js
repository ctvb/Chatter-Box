const router = require('express').Router();

router.get('/', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  } else {
    res.render('login');
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/chat');
    return;
  }else {
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
