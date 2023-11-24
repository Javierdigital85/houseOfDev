const S = require("sequelize");
const db = require("../db");

class ImageProperties extends S.Model {}

ImageProperties.init(
  {
    url: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "imageProperties" }
);

module.exports = ImageProperties;
