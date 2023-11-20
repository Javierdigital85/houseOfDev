const express = require("express");
const propertyRouter = express.Router();
const Property = require("../models/Property");
const { Error } = require("sequelize");

propertyRouter.post("/register", (req, res) => {
  Property.create(req.body)
    .then((property) => res.status(201).send(property))
    .catch((Error) => console.error(Error));
});

//ruta informacion de todos los usuarios
propertyRouter.get("/allRentProperties", (req, res) => {
  Property.findAll()
    .then((property) => {
      res.send(property);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener todos los usuarios" });
    });
});

module.exports = propertyRouter;
