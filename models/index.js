const User = require("./User");
const Property = require("./Property");
const Visit = require("./Visit");
const Favs = require("./Favs");

Visit.belongsTo(User, { as: "prospect" });
Visit.belongsTo(Property, { as: "property" });
Favs.belongsTo(User, { as: "prospect" });
Favs.belongsTo(Property, { as: "property" });

module.exports = { User, Property, Visit, Favs };
