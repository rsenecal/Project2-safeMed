const sequelize = require('../config/connection');
const {
  User,
  Patient,
  Prescription,
  Med,
  PresHistory,
  PotentialCustomer,
} = require('../models');

const userData = require('./userData.json');
const patientData = require('./patientData.json');
const prescriptionData = require('./prescriptionData.json');
// const presHistoryData = require('./presHistoryData.json');
const medData = require('./medData.json');
const potentialCustomerData = require('./potentialCustomerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const patients = await Patient.bulkCreate(patientData, {
    // individualHooks: true,
    returning: true,
  });

  const meds = await Med.bulkCreate(medData, {
    // individualHooks: true,
    returning: true,
  });

  await PotentialCustomer.bulkCreate(potentialCustomerData, {
    // individualHooks: true,
    returning: true,
  });

  for (let prescription of prescriptionData) {
    await Prescription.create({
      ...prescription,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      med_id: meds[Math.floor(Math.random() * users.length)].id,
      patient_id: patients[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
