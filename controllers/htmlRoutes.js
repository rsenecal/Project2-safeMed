const router = require('express').Router();
const { Patient, User, Prescription,Med } = require('../models');

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
    res.render('user', {
      users,
      loggedIn: req.session.loggedIn,
    });
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
    res.render('dashboard', {
      patients,
      loggedIn: req.session.loggedIn,
    });
    // res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ err, msg: 'Something is not right' });
  }
});

router.get('/patientmeds', async (req, res) => {
  try {
    const patientData = await Patient.findAll({
      include: [{model: Med, through: Prescription}]
      // *** We need a where clause if we create a relationship between patients and meds
      //  Currently patient is not link to user.
      //   where: {
      //     patient_id: req.session.userId,
      //   },
    });
<<<<<<< HEAD
    const prescriptions = prescriptiontData.map((prescription) =>
      prescription.get({ plain: true })
    );
    res.render('prescriptions', {
      prescriptions,
      loggedIn: req.session.loggedIn,
    });
    // res.status(200).json(patients);
=======
    const patientmeds = patientData.map((patient) => patient.get({ plain: true }));
    // console.dir (patientmeds[1].Meds[0]);
    res.render('patientmeds', { patientmeds });
    // res.status(200).json(patientmeds);
>>>>>>> 397092a2f3ddd2a26edaca766f121cf501fbaaee
  } catch (err) {
    res.status(400).json({ err, msg: 'Something is not right' });
  }
});


// router.post('/prescriptions', function(req, res, next) {
//   fetch('/api/patients',{
//     method: 'get',
//     headers: { 'Accept': 'application/json' },
//   })
//     .then(res => res.json())
//     .then(json => console.log(json));
//   res.render('prescriptions');
// });

// res.status(200).json(patientMeds);



module.exports = router;
