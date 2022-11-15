require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const moment = require('moment');
// const stripe = require('stripe')(keys.stripeSecretKey);
// const bodyParser = require('body-parser');

// Add for stripe.com integration
// const bodyParser = require('body-parser');
// -----------------------------------------

// ---------------------------------------
const app = express();

const PORT = process.env.PORT || 3001;

//Set up sessions
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add for stripe.com integration
// app.use(bodyParser.urlencoded({ extended: true }));
const hbs = exphbs.create({
  mainLayout: 'main.handlebars',
  // Custom helpers for handlebars
  helpers: {
    dollar: (cents) => cents / 100,

    formatDate: function (date, format) {
      return moment(date).format(format);
    },

    has_passed: function (dateString, options) {
      if (moment(dateString).isAfter(moment())) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// TODO: Invoke app.use() and serve static files from the '/public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Leave these for now, I may need them later -Jeff
app.use(
  '/css',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
  )
);
app.use(
  '/js',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')
  )
);
app.use(
  '/jquery',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

app.use(
  '/boxicons',
  express.static(path.join(__dirname, 'node_modules', 'boxicons', 'css'))
);

app.use(
  '/views',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

// This is your test secret API key.
const stripe = require('stripe')(
  'sk_test_51M34BwJ206BF34Y880WsMHpIkagG3ebN3JmLKaVDsDIBXr21yMs6dCibd1VlFA6w5izcr3tjv8jSfpPWWdXzW29l00kmxx3ZYp'
);
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

// Purchasing the basic plan
app.post('/checkoutplan1', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1M3bNuJ206BF34Y8t20pYpl0',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/paymentcompleted`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });
  res.redirect(303, session.url);
});

// Purchasing the Plus Plan
app.post('/checkoutplan2', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1M4AGAJ206BF34Y8g15swriB',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/paymentcompleted`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.redirect(303, session.url);
});

// Purchasing the Premium Plan
app.post('/checkoutplan3', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1M4AN1J206BF34Y82o92dcMp',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/paymentcompleted`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.redirect(303, session.url);
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
});
