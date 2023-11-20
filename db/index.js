const Sequelize = require("sequelize");
const config = require("../config/envs");
const configProperty = require("../config/property");

const userDb = new Sequelize(config.DB_HOST, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const propertyDb = new Sequelize(config.PROPERTY_DB_HOST, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = {
  userDb,
  propertyDb,
};
