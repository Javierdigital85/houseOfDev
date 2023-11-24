const S = require("sequelize");
const db = require("../db");

class Favs extends S.Model {}

Favs.init({}, { sequelize: db, modelName: "fav" });

module.exports = Favs;
