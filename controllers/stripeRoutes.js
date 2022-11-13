// const express = require('express');
const router = require('express').Router();
const keys = require('../config/keys_dev');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
  res.render('stripepage', { stripePublishableKey: keys.stripePublishableKey });
});


router.get('/charge', (req, res) => {
  res.render('stripecompleted',{layout: 'main'}, { stripePublishableKey: keys.stripePublishableKey });
});

// Charge Route
router.post('/charge', (req, res) => {
  const amount = 1500;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
    .then(customer => stripe.charges.create({
      amount,
      description: 'safeMed Basic Plan',
      currency: 'usd',
      customer: customer.id
    }))
    .then(() => window.location.replace('/stripe/charge'));
  // .then(() => res.render('stripecompleted', {layout: 'main'}));
});

module.exports = router;
