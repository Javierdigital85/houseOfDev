const User = require("./User");
const Property = require("./Property");
const Visit = require("./Visit");

Visit.belongsTo(User, { as: "prospect" });

module.exports = { User, Property, Visit };
