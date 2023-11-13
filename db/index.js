const Sequelize = require("sequelize");
const config = require("../config/envs");

const sequelize = new Sequelize(config.DB_HOST, null, null, {
  host: "localhost",
  dialect: "postgres",
  loggin: false,
});

module.exports = sequelize;
