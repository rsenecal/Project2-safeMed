const router = require('express').Router();
const { checkAuth } = require('../../middlewares/authMiddleware');
const userRoutes = require('./user-routes');
const patientRoutes = require('./patient-routes');
const medRoutes = require('./med-routes');
const prescriptionRoutes = require('./prescription-routes');
const potentialCustomerRoutes = require('./potential-customer-routes');

router.use('/users', userRoutes);
//  *** Once login is working Uncomment the line below ***
// router.use('/patients', checkAuth, patientRoutes);

// ***** Once user login is working comment the line below. ****
router.use('/patients', patientRoutes);
router.use('/prescriptions', prescriptionRoutes);

router.use('/meds', medRoutes);

router.use('/customers', potentialCustomerRoutes);

module.exports = router;
