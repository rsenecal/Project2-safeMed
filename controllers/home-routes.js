const router = require('express').Router();

//GET homepage
router.get('/', (req, res) => {
  res.render('homepage', { layout: 'main' });
  //render
});

module.exports = router;
