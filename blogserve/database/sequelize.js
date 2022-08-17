const Sequelize = require("sequelize");
const config = require("./../config/index").db;
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        logging: false,
        host: config.host,
        dialect: "mysql",
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
        },
        pool: {
            max: 20,
            min: 0,
            idle: 30000,
        },
        timezone: "+08:00", //东八时区
    }
);
module.exports = sequelize;
