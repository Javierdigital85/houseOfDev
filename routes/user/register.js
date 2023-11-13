const express = require("express");
const registerRouter = express.Router();
// !! REQUERIR USER MODEL

registerRouter.post("/register", (req, res) => {
  User.create(req.body).then((user) => res.status(201).send(user));
});

module.exports = registerRouter;
