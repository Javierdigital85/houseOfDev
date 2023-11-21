const User = require("./User");
const Property = require("./Property");
const Visit = require("./Visit");

Visit.belongsTo(User, { as: "prospect" });
Visit.belongsTo(Property, { as: "property" });

module.exports = { User, Property, Visit };
