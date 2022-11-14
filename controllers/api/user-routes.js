const router = require('express').Router();
const { User } = require('../../models');

// GET api/users - get all potential users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err, msg: 'perhaps there are no users' });
  }
});

// POST /api/users - makes a new user
router.post('/', async (req, res) => {
  // get user data from the req.body
  // const {username, password, email, first_name, last_name, title, role} = req.body;
  // create a new user
  const user = await User.create(req.body);
  // add user info to the session
  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.userId = user.id;
    res.json(user);
  });
});

// POST /api/users/login - logs a user in
router.post('/login', async (req, res) => {
  // get user data from the req.body
  const { username, password } = req.body;
  // create a new user
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  // does the user exist?
  // no? send back a 404
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  // is the password correct
  // no? send back 401
  if (!user.checkPassword(password)) {
    return res.status(401).json({
      message: 'Username or password was incorrect. ',
    });
  }

  // add user info to the session
  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.userId = user.id;
    res.status(200).json({
      message: 'successfully logged in',
    });
  });
});

// GET /api/users/logout - makes a new user
router.get('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    // add user info to the session
    //   req.session.destroy(()=> {
    res.status(204).end();
    // });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
