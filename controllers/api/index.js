const router = require('express').Router();
const { checkAuth } = require('../../middlewares/authMiddleware');
const userRoutes = require('./user-routes');
const patientRoutes = require('./patientRoutes');
const medRoutes = require('./medRoutes');

router.use('/users', userRoutes);
//  *** Once login is working Uncomment the line below ***
// router.use('/patients', checkAuth, patientRoutes);

// ***** Once user login is working comment the line below. ****
router.use('/patients', patientRoutes);
router.use('/meds', medRoutes);

module.exports = router;