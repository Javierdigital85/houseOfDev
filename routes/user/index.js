const express = require("express");
const userRouter = express.Router();
const Users = require("../../models/User");
const { Error } = require("sequelize");

userRouter.post("/register", (req, res) => {
  Users.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((Error) => console.error(Error));
});

module.exports = userRouter;
