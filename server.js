const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// TODO: Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));

// Leave these for now, I may need them later -Jeff
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
