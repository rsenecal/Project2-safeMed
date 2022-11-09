const User = require('./user');
const Patient = require('./patient');
const Prescription = require('./prescriptions');
const Pres_History = require('./pres_history');
const Med = require('./med')

User.hasOne(Patient, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Patient.belongsTo(User, {
    foreignKey: 'user_id',
});

Patient.hasMany(Prescription, {
    foreignKey: 'patient_id',
    onDelete: 'CASCADE',
});

Prescription.belongsTo(Patient, {
    foreignKey: 'patient_id',
});

Pres_History.belongsTo(Prescription, {
    foreignKey: 'prescription_id',
});

Med.belongsTo(Prescription, {
    foreignKey: 'prescription_med_given',
});

Prescription.hasMany(Pres_History, {
    foreignKey: 'prescription_id',
},
    Med, {
    foreignKey: 'prescription_med_given'
}
)




module.exports = { User, Patient, Prescription, Pres_History, Med };