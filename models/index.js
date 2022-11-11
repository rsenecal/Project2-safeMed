const User = require('./User');
const Patient = require('./Patient');
const Prescription = require('./Prescription');
const PresHistory = require('./PresHistory');
const Med = require('./Med');

User.hasMany(Patient, {
  foreignKey: 'user_id',
  // onDelete: 'CASCADE',
});

Patient.belongsTo(User, {
  foreignKey: 'user_id',
});

Patient.hasMany(Prescription, {
  foreignKey: 'patient_id',
  // onDelete: 'SET NULL',
});

Prescription.belongsTo(Patient, {
  foreignKey: 'patient_id',
});

PresHistory.belongsTo(Prescription, {
  foreignKey: 'prescription_id',
});

// Med.belongsTo(Prescription, {
//   foreignKey: 'prescription_med_given',
// });

// Prescription.hasMany(Pres_History, {
//   foreignKey: 'prescription_id',
// },
// Med, {
//   foreignKey: 'prescription_med_given'
// }
// );




module.exports = { User, Patient, Prescription, PresHistory, Med };