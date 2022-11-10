const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');



const app = express();
const PORT = process.env.PORT || 3001;

// TODO: Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));



app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

sequelize.sync({ force: false })
  .then (() =>{
    app.listen(PORT, () =>
      console.log(`Example app listening at http://localhost:${PORT}`));

  });


