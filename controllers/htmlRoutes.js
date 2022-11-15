const router = require('express').Router();
const { checkAuth } = require('../middlewares/index');
const { Patient, User, Prescription, Med } = require('../models');

//GET homepage
router.get('/', (req, res) => {
  res.render('homepage');
  //render
});

// GET /login - render customer login page
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/paymentcompleted', (req, res) => {
  res.render('paymentcompleted');
});
// GET /login - render login page
router.get('/user-select', checkAuth, async (req, res) => {
  try {
    const userData = await User.findAll({});

    const users = userData.map((user) => user.get({ plain: true }));
    res.render('user', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /dashboard/:id - render dashboard page
router.get('/dashboard/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findOne({
      where: {
        id: userId,
      },
      include: [{ model: Patient, through: Prescription }],
    });

    const user = userData.get({ plain: true });
    const patients = userData.patients.map((patient) =>
      patient.get({ plain: true })
    );

    res.status(200).render('dashboard', {
      user,
      patients,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({ err, msg: 'Something is not right' });
  }
});

router.get('/patientmeds/:id', async (req, res) => {
  const patientId = req.params.id;
  try {
    const patientData = await Patient.findOne({
      where: {
        id: patientId,
      },
      include: [{ model: Med, through: Prescription }],
    });

    // res.json(patientData);

    const patient = patientData.get({ plain: true });
    const meds = patientData.Meds.map((meds) => meds.get({ plain: true }));
    res.status(200).render('patientmeds', {
      patient,
      meds,
      loggedIn: req.session.loggedIn,
    });
    // res.status(200).json(patientmeds);
  } catch (err) {
    res.status(500).json({ err, msg: 'Something is not right' });
  }
});

module.exports = router;
