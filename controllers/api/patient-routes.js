const { Patient } = require('../../models');

const router = require('express').Router();

// get all Patients
router.get('/', async (req, res) => {
  try {
    const patientData = await Patient.findAll({
    // *** We need a where clause if we create a relationship between patients and uer
    //  Currently patient is not link to user.
    //   where: {
    //     user_id: req.session.userId,
    //   },
    });
    const patients = patientData.map((patient) =>
      patient.get({ plain: true })
    );
    res.render('patients', {patients})
    // res.status(200).json(patients);

  } catch (err) {
    res
      .status(400)
      .json({ err, msg: 'Something is not right' });
  }
});

// get patient by id
router.get('/:patientId', async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.patientId,
        // user_id: req.session.userId,
      },
    });

    if (!patient) {
      return res.status(404).json({
        msg: 'No patient with this id',
      });
    }

    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({
      err,
      msg: 'server error',
    });
  }
});

// post new patient
router.post('/', async (req, res) => {
  try {
    const addPatient = await Patient.create({
      ...req.body,
    //   user_id: req.session.userId,
    });
    res.status(200).json(addPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// put patient by id
router.put('/:patientId', async (req, res) => {
  try {
    const updatedPatient = await Patient.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.patientId,
        //   user_id: req.session.userId,
        },
      }
    );
    if (!updatedPatient[0]) {
      return res.status(404).json({
        msg: 'the patient with this id was not found',
      });
    }
    res.status(200).json(updatedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a patient by ID
router.delete('/:patientId', async (req, res) => {
  try {
    const destroyedPatient = await Patient.destroy({
      where: {
        id: req.params.patientId,
        // user_id: req.session.userId,
      },
    });
    if (!destroyedPatient) {
      return res.status(404).json({
        msg: 'the patient with this id was not found (for this user)',
      });
    }
    res.status(200).json(destroyedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;