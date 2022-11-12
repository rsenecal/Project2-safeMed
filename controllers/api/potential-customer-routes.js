const router = require('express').Router();
const { PotentialCustomer } = require('../../models');

// GET api/customers - get all potential customers
router.get('/', async (req, res) => {
  try {
    const customers = await PotentialCustomer.findAll({});
    res.status(200).json(customers);
  } catch (err) {
    res
      .status(400)
      .json({ err, msg: 'perhaps there are no potential customers' });
  }
});

// GET api/customers/:id
router.get('/:id', async (req, res) => {
  try {
    const customer = await PotentialCustomer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        msg: 'perhaps there are no customers with this id',
      });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({
      err,
      msg: 'server error',
    });
  }
});

module.exports = router;
