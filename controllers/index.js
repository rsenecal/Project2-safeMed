const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const stripeRoutes = require('./stripeRoutes')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/stripe', stripeRoutes);
// router.use(homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
