const express = require("express");
const visitRouter = express.Router();
const { Error } = require("sequelize");
const Visits = require("../models/Visit");

//Registramos las citas
visitRouter.post("/register", (req, res) => {
  const { propertyId, dateTime } = req.body;
  Visits.findOne({
    where: {
      propertyId,
      dateTime,
    },
  })
    .then((data) => {
      if (data) throw new Error("OCUPADO");
      else {
        Visits.create(req.body).then((visit) => {
          res.status(201).send(visit);
        });
      }
    })
    .catch((Error) => {
      console.error(Error);
      res.status(404).json({ Error: Error || "Error al hacer la cita" });
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
