const { Prescription } = require('../../models');
const router = require('express').Router();

// get all Prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({

      // include: [
      //   {
      //     model: Patient,
      //     attributes: [
      //       'first_name',
      //       'Last_name',
      //     ],
      //   }
      // {
      //   model: Med,
      //   attributes: [
      //     'name',
      //     'maker',
      //   ],
      // },

      // ],

    //   where: {
    //     patient_id: req.session.patientId,
    //   },
    });
    res.status(200).json(prescriptions);
  } catch (err) {
    res
      .status(400)
      .json({ err, msg: 'Something is not right' });
  }
});
// get prescription by id
router.get('/:prescriptionId', async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      where: {
        id: req.params.prescriptionId,
      },
    });

    if (!prescription) {
      return res.status(404).json({
        msg: 'No patient with this id',
      });
    }

    res.status(200).json(prescription);
  } catch (err) {
    res.status(500).json({
      err,
      msg: 'server error',
    });
  }
});
// post new prescription
router.post('/', async (req, res) => {
  try {
    const addPrescription = await Prescription.create({
      ...req.body,

    });
    res.status(200).json(addPrescription);
  } catch (err) {
    res.status(500).json(err);
  }
});

// put prescription by id
router.put('/:prescriptionId', async (req, res) => {
  try {
    const updatedPrescription = await Prescription.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.prescriptionId,
        },
      }
    );
    if (!updatedPrescription[0]) {
      return res.status(404).json({
        msg: 'the prescription with this id was not found',
      });
    }
    res.status(200).json(updatedPrescription);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a prescription by ID
router.delete('/:prescriptionId', async (req, res) => {
  try {
    const destroyedPrescription = await Prescription.destroy({
      where: {
        id: req.params.prescriptionId,
      },
    });
    // if (!destroyedPrescription) {
    //   return res.status(404).json({
    //     msg: 'the prescription with this id was not found (for this patient)',
    //   });
    // }
    res.status(200).json(destroyedPrescription);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;