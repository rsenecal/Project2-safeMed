const sequelize = require('../config/connection');
const { User, Patient, Prescription, Pres_History } = require('../models');

const userData = require('./userData.json');
const patientData = require('./patientData.json');
const prescriptionData = require('./patientData.json');
const pres_history = require('./pres_history.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });



    process.exit(0);
};

seedDatabase();