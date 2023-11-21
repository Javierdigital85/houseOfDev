const S = require("sequelize");
const db = require("../db");
const User = require("./User");
const Property = require("./Property");

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

Visits.belongsTo(User, { as: "prospect" });
Visits.belongsTo(Property, { as: "property" });

module.exports = Visits;
