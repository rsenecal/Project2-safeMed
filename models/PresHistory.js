const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PresHistory extends Model {}

PresHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    prescription_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prescription',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pres_history'
  }
);

module.exports = PresHistory;

