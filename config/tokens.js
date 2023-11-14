const jwt = require("jsonwebtoken");

const { SECRET } = require("./envs");

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "2d" });
  return token;
};

//aqui en hacemos la persistencia del token
const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, validateToken };
