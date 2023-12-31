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
    address: {
      type: S.STRING,
      allowNull: false,
    },
    number: {
      type: S.INTEGER,
      allowNull: false,
    },
    onSale: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: S.STRING,
      allowNull: false,
    },
    img: {
      type: S.STRING,
    },
    squareMeters: {
      type: S.STRING,
    },
    bathrooms: {
      type: S.STRING,
    },
    bedrooms: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "properties" }
);

module.exports = Property;
