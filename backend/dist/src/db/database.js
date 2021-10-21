"use strict";
var Sequelize = require('sequelize').Sequelize;
// @ts-ignore:next-line
var _a = require('../../../config/config'), development = _a.development, production = _a.production;
var database = 0; // 0 = Localhost database  ||  1 = Heroku database
var heroku = 0;
var sequelizeOb;
if (!process.env.DATABASE_URL) {
    require('dotenv').config();
    heroku = 1;
}
if (database == 0) {
    sequelizeOb = new Sequelize(development.database, development.username, development.password, {
        host: development.host,
        dialect: "postgres"
    });
}
else {
    if (heroku == 1) {
        sequelizeOb = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
            host: process.env.HOST,
            port: process.env.PORT,
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        });
    }
    else {
        sequelizeOb = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            logging: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                }
            }
        });
    }
}
module.exports = sequelizeOb;
