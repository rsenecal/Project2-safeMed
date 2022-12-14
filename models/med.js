const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Med extends Model { }

Med.init(

  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    maker: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,

    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Med'
  },

);


module.exports = Med;