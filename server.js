const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
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
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add for stripe.com integration
// app.use(bodyParser.urlencoded({ extended: true }));
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// TODO: Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));

// Leave these for now, I may need them later -Jeff
app.use(
  '/css',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
  )
);
app.use(
  '/jquery',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')
  )
);
app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
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
