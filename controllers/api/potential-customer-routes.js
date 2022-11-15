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

// POST api/customers - add new potential customer
router.post('/', async (req, res) => {
  try {
    const customerAdded = await PotentialCustomer.create({
      ...req.body,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.customerId = customerAdded.id;
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
        msg: 'the Potential customer with this id was not found',
      });
    }
    res.status(200).json(destroyedCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST api/customers/login - log customer in
router.post('/login', async (req, res) => {
  // get user data from the req.body
  const { email, password } = req.body;
  const customer = await PotentialCustomer.findOne({
    where: {
      email: email,
    },
  });

  // does the customer exist?
  // no? send back a 404
  if (!customer) {
    return res.status(404).json({
      message: 'customer not found',
    });
  }

  // is the password correct
  // no? send back 401
  if (!customer.checkPassword(password)) {
    return res.status(401).json({
      message: 'email or password was incorrect. ',
    });
  }

  // add customer info to the session
  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.customerId = customer.id;
    res.status(200).json({
      message: 'successfully logged in',
      customer_id: customer.id,
    });
  });
});

// GET /api/customers/logout - logout customer
router.get('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
