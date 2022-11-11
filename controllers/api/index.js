const router = require('express').Router();
const { checkAuth } = require('../../middlewares/authMiddleware');
const userRoutes = require('./user-routes');
const patientRoutes = require('./patientRoutes');

router.use('/users', userRoutes);
router.use('/patients', patientRoutes);
module.exports = router;