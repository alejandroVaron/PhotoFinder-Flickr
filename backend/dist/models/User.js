"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = require('../db/database');
class User extends sequelize_1.Model {
    static associate() {
    }
}
;
User.init({
    id_user: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    user_password: sequelize_1.DataTypes.STRING
}, {
    sequelize,
    modelName: 'User',
});
module.exports = User;
