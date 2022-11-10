const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Prescription extends Model { }

Prescription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patient',
        key: 'id',
      },
    },
    med_given: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dose: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dispense_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_started: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_ended: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'prescription',
  }
);

module.exports = Prescription;
