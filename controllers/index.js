const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');
const stripeRoutes = require('./stripeRoutes');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);
router.use('/stripe', stripeRoutes);
// router.use(homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
