const User = require('./user');
const Patient = require('./patient');
const Prescription = require('./prescription');
const Med = require('./med');
const PotentialCustomer = require('./PotentialCustomer');


Patient.belongsToMany(Med, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Prescription,
    unique: false
  },
  // Define an alias for when data is retrieved
  // as: 'planned_Prescriptions'
});

Med.belongsToMany(Patient, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Prescription,
    unique: false
  },
  // Define an alias for when data is retrieved
  // as: 'Med_Patients'
});




// User.belongsToMany(Patient, {
//   through: {
//     model: Prescription,
//     unique: false,
//   },
//   // foreignKey: 'user_id',
//   // onDelete: 'CASCADE',
// });

// Med.belongsToMany(Patient, {
//   through: {
//     model: Prescription,
//     unique: false,
//   },
//   // foreignKey: 'user_id',
//   // onDelete: 'CASCADE',
// });

// Patient.belongsToMany(Med, {
//   through: {
//     model: Prescription,
//     unique: false,
//   },
//   // foreignKey: 'user_id',
//   // onDelete: 'CASCADE',
// });

// Patient.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// Patient.hasMany(Prescription, {
//   foreignKey: 'patient_id',
//   // onDelete: 'SET NULL',
// });

// Prescription.belongsTo(Patient, {
//   foreignKey: 'patient_id',
// });

// Prescription.belongsTo(Patient, {
//   foreignKey: 'med_id',
// });


module.exports = { User, Patient, Prescription, Med, PotentialCustomer };

// module.exports = { User, Patient, Prescription, PresHistory, Med };
