const S = require("sequelize");
const db = require("../db");
const User = require("./User");
const Property = require("./Property");

class Visits extends S.Model {}

Visits.init(
  {
    dateTime: {
      type: S.DATE,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize: db, modelName: "visit" }
);

module.exports = Visits;
