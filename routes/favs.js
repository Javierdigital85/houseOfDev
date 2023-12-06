const express = require("express");
const favsRouter = express.Router();
const Favs = require("../models/Favs");
const Property = require("../models/Property");
const { promises } = require("nodemailer/lib/xoauth2");

favsRouter.post("/register", (req, res) => {
  const { prospectId, propertyId } = req.body;
  Favs.findOrCreate({
    where: { prospectId, propertyId },
    defaults: { prospectId, propertyId },
  })
    .then(([user, created]) => {
      if (created) return res.status(201).send(created);
      res.status(200).send(created);
    })
    .catch((err) => console.error(err));
});
favsRouter.get("/", (req, res) => {
  Favs.findAll({ where: req.query })
    .then((res) => {
      const arrayId = res.map((propId) => {
        return propId.propertyId;
      });
      const promesas = arrayId.map((id) => {
        return Property.findByPk(id);
      });
      return promesas;
    })
    .then((promesas) => {
      return Promise.all(promesas);
    })
    .then((result) => res.status(200).send(result));
});

module.exports = favsRouter;
