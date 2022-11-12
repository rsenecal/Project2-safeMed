const router = require('express').Router();

//GET homepage
router.get('/', (req, res) => {
  res.render('homepage', { layout: 'main' });
  //render
});

router.get('/patients', (req, res) => {
  res.render('patients');
});

module.exports = router;
