const express = require("express");
const propertyRouter = express.Router();
const Property = require("../models/Property");
const { Error } = require("sequelize");

propertyRouter.post("/register", (req, res) => {
  Property.create(req.body)
    .then((property) => res.status(201).send(property))
    .catch((Error) => console.error(Error));
});

//ruta informacion de todos las propiedades
propertyRouter.get("/alquiler", (req, res) => {
  Property.findAll({
    where: { onSale: false },
  })
    .then((property) => {
      console.log(
        "PROPIEDADES:::::::::::::::::::::::::::::::::::::::::::::::::",
        property
      );
      res.send(property);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener todos las propiedades" });
    });
});

propertyRouter.get("/comprar", (req, res) => {
  Property.findAll({
    where: { onSale: true },
  })
    .then((property) => {
      console.log(
        "PROPIEDADES:::::::::::::::::::::::::::::::::::::::::::::::::",
        property
      );
      res.send(property);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener todos las propiedades" });
    });
});

module.exports = propertyRouter;
