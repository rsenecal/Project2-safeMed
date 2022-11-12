const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PotentialCustomer extends Model {}

PotentialCustomer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'potential_customer',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = PotentialCustomer;
