const router = require('express').Router();
const { Patient } = require('../models');

//GET homepage
router.get('/', (req, res) => {
  res.render('homepage', { layout: 'main' });
  //render
});

// GET /login - render login page
router.get('/login', (req, res) => {
  res.render('login', { layout: 'main' });
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
