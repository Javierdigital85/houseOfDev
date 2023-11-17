const S = require("sequelize");
const db = require("../db");

class Property extends S.Model {}

Property.init(
  {
    province: {
      type: S.STRING,
      allowNull: false,
    },
    city: {
      type: S.STRING,
      allowNull: false,
    },
    adress: {
      type: S.STRING,
      allowNull: false,
    },
    number: {
      type: S.INTEGER,
      allowNull: false,
    },
    onSale: {
      type: S.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "properties" }
);

module.exports = Property;
