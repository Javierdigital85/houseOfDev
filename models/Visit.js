const S = require("sequelize");
const db = require("../db");

class Visits extends S.Model {}

Visits.init(
  {
    date: {
      type: S.DATE,
      allowNull: false,
    },
    time: {
      type: S.TIME,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "visit" }
);

module.exports = Visits;
