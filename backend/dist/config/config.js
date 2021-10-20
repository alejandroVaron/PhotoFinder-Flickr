"use strict";
module.exports = {
    development: {
        username: "postgres",
        password: "alejo",
        database: "postgres",
        host: "localhost",
        dialect: "postgres",
        operatorsAliases: 0
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION 
            },
        },
    },
    key: "supersecretkeyomg"
};
