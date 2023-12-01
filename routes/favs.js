const express = require("express");
const favsRouter = express.Router();
const Favs = require("../models/Favs");

favsRouter.get("/", (req, res) => {
  Favs.findAll().then((favs) => res.status(200).send(favs));
});

favsRouter.post("/register", (req, res) => {
  Favs.create(req.body)
    .then((newFav) => res.status(201).send(newFav))
    .catch((error) => console.log("Ha ocurrido un error: ", error));
});

module.exports = favsRouter;
