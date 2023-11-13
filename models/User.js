const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

Users.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return user
    .hash(user.password, user.salt)
    .then((hash) => (user.password = hash));
});

module.exports = Users;
