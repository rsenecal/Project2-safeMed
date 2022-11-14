const router = require('express').Router();

//GET homepage
router.get('/', (req, res) => {
  res.render('patients', { layout: 'main' });
  //render
});

module.exports = router;
