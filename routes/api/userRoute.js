const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      firstname: req.body.firstname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
       // Store the hashed password in the database
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(userData.username + " is logged in")
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const saltRounds = 10; // Number of salt rounds to use for the hash
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const userData = await User.create({
      firstname: req.body.firstname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword // Store the hashed password in the database
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ userData, message: 'Profile created successfully' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
