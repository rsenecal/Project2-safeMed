const router = require('express').Router();
const { Patient, User } = require('../models');

//GET homepage
router.get('/', (req, res) => {
  res.render('homepage', { layout: 'main' });
  //render
});

// GET /login - render login page
router.get('/login', async (req, res) => {
  try {
    const userData = await User.findAll({});

    const users = userData.map((user) => user.get({ plain: true }));
    res.render('login', { users });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /dashboard - render dashboard page
router.get('/dashboard', async (req, res) => {
  try {
    const patientData = await Patient.findAll({
      // *** We need a where clause if we create a relationship between patients and uer
      //  Currently patient is not link to user.
      //   where: {
      //     user_id: req.session.userId,
      //   },
    });
    const patients = patientData.map((patient) => patient.get({ plain: true }));
    res.render('dashboard', { patients });
    // res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ err, msg: 'Something is not right' });
  }
});

module.exports = router;
