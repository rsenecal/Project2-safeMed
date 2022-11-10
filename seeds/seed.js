const sequelize = require('../config/connection');
const { User, Patient, Prescription, Med, PresHistory } = require('../models');

const userData = require('./userData.json');
const patientData = require('./patientData.json');
const prescriptionData = require('./prescriptionData.json');
const presHistoryData = require('./presHistoryData.json');
const medData = require('./medData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Med.bulkCreate(medData, {
    returning: true,
  });

  await Patient.bulkCreate(patientData, {
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Prescription.bulkCreate(prescriptionData, {
    returning: true,
  });

  await PresHistory.bulkCreate(presHistoryData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();