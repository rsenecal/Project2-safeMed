const User = require('./user');
const Patient = require('./patient');
const Prescription = require('./prescription');
const Med = require('./med');
const PotentialCustomer = require('./PotentialCustomer');

Patient.belongsToMany(Med, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Prescription,
    unique: false,
  },
  // Define an alias for when data is retrieved
  // as: 'planned_Prescriptions'
});

Med.belongsToMany(Patient, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Prescription,
    unique: false,
  },
  // Define an alias for when data is retrieved
  // as: 'Med_Patients'
});

Patient.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Prescription,
    unique: false,
  },
});

User.belongsToMany(Patient, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Prescription,
    unique: false,
  },
});

module.exports = { User, Patient, Prescription, Med, PotentialCustomer };
