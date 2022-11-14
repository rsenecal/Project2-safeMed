// const express = require('express');
const router = require('express').Router();
const keys = require('../config/keys_dev');
const fs = require('fs');
const { data } = require('jquery');
const stripe = require('stripe')(keys.stripeSecretKey);


router.get('/', (req, res) => {
  fs.readFile('price.json', function(error, data) {
    if(error) {
      res.status(500).end();
    } else {
      res.render('pricingpage', {
        // stripePublishableKey: keys.stripePublishableKey,
        items: JSON.parse(data)
      });
    //   console.log(items);
    }
  });
});


router.get('/', (req, res) => {
  fs.readFile('price.json', function(error, data) {
    if(error) {
      res.status(500).end();
    } else {
      console.log('purchased');
    }
  });
  //   console.log(items);
}
);


// This is your test secret API key.
// const stripe = require('stripe')('sk_test_51M34BwJ206BF34Y880WsMHpIkagG3ebN3JmLKaVDsDIBXr21yMs6dCibd1VlFA6w5izcr3tjv8jSfpPWWdXzW29l00kmxx3ZYp');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3001';

router.post('/safemedbasic', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1M3bNuJ206BF34Y8t20pYpl0',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

// app.listen(4242, () => console.log('Running on port 4242'));
module.exports = router;
