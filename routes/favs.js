const express = require("express");
const favsRouter = express.Router();
const Favs = require("../models/Favs");

favsRouter.get("/", (req, res) => {
  Favs.findAll().then((favs) => res.status(200).send(favs));
});

favsRouter.post("/register", (req, res) => {
  if (!req.body.prospectId)
    res.status(401).send("necesitas estar loggeado para agregar a favoritos");
  const { prospectId, propertyId } = req.body;
  Favs.findOrCreate({
    where: { prospectId, propertyId },
    defaults: { prospectId, propertyId },
  })
    .then(([user, created]) => {
      if (created) res.status(201).send(created);
      res.status(200).send(created);
    })
    .catch((err) => console.error(err));
});

module.exports = favsRouter;
