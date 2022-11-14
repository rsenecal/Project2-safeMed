const router = require('express').Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const { Patient, User, Prescription } = require('../models');

//GET homepage
router.get('/', (req, res) => {
  res.render('homepage');
  //render
});

router.get('/login', (req, res) => {
  res.render('login');
});

// GET /login - render login page
router.get('/user-select', async (req, res) => {
  try {
    const userData = await User.findAll({});

    const users = userData.map((user) => user.get({ plain: true }));
    res.render('user', { users });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /dashboard - render dashboard page
router.get('/dashboard', checkAuth, async (req, res) => {
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

router.get('/prescriptions', async (req, res) => {
  try {
    const prescriptiontData = await Prescription.findAll({
      // *** We need a where clause if we create a relationship between patients and uer
      //  Currently patient is not link to user.
      // where: {
      //   patient_id: req.session.patientId,
      // },
      // include: [
      //   {
      //     model: Patient,
      //     attributes: [
      //       'first_name',
      //       'Last_name',
      //     ],
      //   },
      // {
      //   model: Med,
      //   attributes: [
      //     'name',
      //     'maker',
      //   ],
      // },
      // ],
    });
    const prescriptions = prescriptiontData.map((prescription) =>
      prescription.get({ plain: true })
    );
    res.render('prescriptions', { prescriptions });
    // res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ err, msg: 'Something is not right' });
  }
});

module.exports = router;
