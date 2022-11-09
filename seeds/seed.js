const sequelize = require('../config/connection');
const { User, Patient, Prescription, Pres_History, Med } = require('../models');

const userData = require('./userData.json');
const patientData = require('./patientData.json');
const prescriptionData = require('./prescriptionData.json');
const pres_historyData = require('./pres_historyData.json')
const medData = require('./medData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });



    process.exit(0);
};

seedDatabase();