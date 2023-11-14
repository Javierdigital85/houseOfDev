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

router.post("/login", (req, res) => {
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
          lastname: user.lastname,
        };
        const token = generateToken(payload);
        res.cookie("token", token);
        res.send(payload);
      }
    });
  });
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

module.exports = userRouter;
