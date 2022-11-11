const router = require('express').Router();
const { checkAuth } = require('../../middlewares/authMiddleware');
const userRoutes = require('./user-routes');
const patientRoutes = require('./patientRoutes');

router.use('/users', userRoutes);
//  *** Once login is working Uncomment the line below ***
// router.use('/patients', checkAuth, patientRoutes);

// ***** Once user login is working comment the line below. ****
router.use('/patients', patientRoutes);
module.exports = router;