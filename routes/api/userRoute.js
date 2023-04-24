const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { request } = require('express');

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
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

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(password)
    if (password.length < 8) {
      throw new Error('Password is too short')
    }
    const user = await User.findOne({ where: { username } });
    if (user) {
      throw new Error('This username is already taken.');
    }

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
    console.log(err.message);
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
