const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class PotentialCustomer extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (newCustomerData) => {
        newCustomerData.password = await bcrypt.hash(
          newCustomerData.password,
          10
        );
        return newCustomerData;
      },
      beforeUpdate: async (updatedCustomerData) => {
        updatedCustomerData.password = await bcrypt.hash(
          updatedCustomerData.password,
          10
        );
        return updatedCustomerData;
      },
    },
    sequelize,
    modelName: 'potential_customer',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = PotentialCustomer;
