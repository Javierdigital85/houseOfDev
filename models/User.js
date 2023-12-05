const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (hash) => hash === this.password
    );
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
    phone: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
    isAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    superAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

Users.beforeSave((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return user
    .hash(user.password, user.salt)
    .then((hash) => (user.password = hash));
});

module.exports = Users;
