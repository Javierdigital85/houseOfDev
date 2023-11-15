const express = require("express");
const userRouter = express.Router();
const Users = require("../models/User");
const { Error } = require("sequelize");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middleware/auth");

userRouter.post("/register", (req, res) => {
  Users.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((Error) => console.error(Error));
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({
    where: { email },
  }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      else {
        const payload = {
          email: user.email,
          name: user.name,
          lastname: user.lastName,
        };
        const token = generateToken(payload);
        console.log("TOKENNN", token);
        res.cookie("token", token);
        res.send(payload);
        console.log("usuario logueado", payload);
      }
    });
  });
});

userRouter.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
  console.log(req.user);
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
  console.log("token del usuario borrado");
});

module.exports = userRouter;
