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
// const keys = require('./config/keys');

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

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
});

// app.listen(PORT, () =>
//   console.log(`Example app listening at http://localhost:${PORT}`)
// );
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/index.html')))
