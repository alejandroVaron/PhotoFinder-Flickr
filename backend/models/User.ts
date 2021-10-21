import { Model, DataTypes } from 'sequelize';
const sequelize = require('../db/database');

class User extends Model {
  static associate() {

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
