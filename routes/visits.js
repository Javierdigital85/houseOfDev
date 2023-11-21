const express = require("express");
const visitRouter = express.Router();
const { Error } = require("sequelize");
const Visits = require("../models/Visit");

//Registramos las citas
visitRouter.post("/register", (req, res) => {
  Visits.create(req.body)
    .then((visit) => {
      res.status(201).send(visit);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al hacer la cita" });
    });
});

//ruta informacion de esa citas

visitRouter.get("/citas", (req, res) => {
  Visits.findAll()
    .then((visit) => {
      res.send(visit);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error al obtener todas las citas" });
    });
});

module.exports = visitRouter;
