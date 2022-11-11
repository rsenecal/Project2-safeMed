const { Patient, Med } = require('../../models');

const router = require('express').Router();

// get all meds
router.get('/', async (req, res) => {
  try {
    const meds = await Med.findAll({
    // *** We need a where clause if we create a relationship between med and user or patient
    //  Currently we do not have a relationship between meds and Patient or user.
    //   where: {
    //     user_id: req.session.userId,
    //   },
    });
    res.status(200).json(meds);
  } catch (err) {
    res
      .status(400)
      .json({ err, msg: 'Something is not right' });
  }
});

// get med by id
router.get('/:medId', async (req, res) => {
  try {
    const med = await Med.findOne({
      where: {
        id: req.params.medId,
        // user_id: req.session.userId,
      },
    });

    if (!med) {
      return res.status(404).json({
        msg: 'No med with this id',
      });
    }

    res.status(200).json(med);
  } catch (err) {
    res.status(500).json({
      err,
      msg: 'server error',
    });
  }
});

// post new med
router.post('/', async (req, res) => {
  try {
    const addMed = await Med.create({
      ...req.body,
    //   user_id: req.session.userId,
    });
    res.status(200).json(addMed);
  } catch (err) {
    res.status(500).json(err);
  }
});

// put med by id
router.put('/:medId', async (req, res) => {
  try {
    const updatedMed = await Med.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.medId,
        //   user_id: req.session.userId,
        },
      }
    );
    if (!updatedMed[0]) {
      return res.status(404).json({
        msg: 'the patient with this id was not found',
      });
    }
    res.status(200).json(updatedMed);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a med by ID
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