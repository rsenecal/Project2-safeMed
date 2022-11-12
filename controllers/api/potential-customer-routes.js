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

// GET api/customers/:id - get one potential customer
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

// POST api/customers - add new potential customer
router.post('/', async (req, res) => {
  try {
    const customerAdded = await PotentialCustomer.create({
      ...req.body,
    });
    res.status(200).json(customerAdded);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE api/customers - add new potential customer
router.delete('/:id', async (req, res) => {
  try {
    const destroyedCustomer = await PotentialCustomer.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!destroyedCustomer) {
      return res.status(404).json({
        msg: 'the Potential customer with this id was not found (for this user)',
      });
    }
    res.status(200).json(destroyedCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
