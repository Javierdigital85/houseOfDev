const jwt = require("jsonwebtoken");

const { SECRET } = require("escribimos de donde requerimos SECRET");

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "2d" });
  return token;
};
console.log("asd");
//aqui en hacemos la persistencia del token
const validateToken = () => {};

module.exports = { generateToken, validateToken };
