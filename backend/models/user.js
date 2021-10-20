'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class User extends Model {
  static associate(models) {

  }
};
User.init({
  id_user: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  user_email: {
    type:DataTypes.STRING,
    unique: true
  },
  user_password: DataTypes.STRING
},{
  sequelize,
  modelName: 'User',
});

module.exports = User
