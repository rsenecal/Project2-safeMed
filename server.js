const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');

// const session = require('express-session');

const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
// const sess = {
//   secret: 'Super secret secret',
//   resave: false,
//   saveUninitialized: false,
// };

// app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// TODO: Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));



app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
app.use(routes);

// app.listen(PORT, () =>
//   console.log(`Example app listening at http://localhost:${PORT}`)
// );

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


