const router = require('express').Router();

//GET homepage
router.get('/', (req, res) => {
    res.render('home', {layout: 'homepage'});
});




module.exports = router;