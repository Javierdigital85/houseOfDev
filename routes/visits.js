const express = require("express");
const visitRouter = express.Router();
const { Error } = require("sequelize");
const { transporter } = require("../config/mailer");

const Visits = require("../models/Visit");

const confirmDate = (email) => {
  transporter
    .sendMail({
      from: `VISITA CONFIRMADA <houseofdev23@gmail.com>`,
      to: email,
      subject: "VISITA CONFIRMADA",
      text: "PRUEBA",
    })
    .then(() => console.log("Mensaje enviado"))
    .catch((err) => console.error(err));
};

// const rescheduleDate = (email) => {
//   transporter
//     .sendMail({
//       from: `VISITA CONFIRMADA <houseofdev23@gmail.com>`,
//       to: email,
//       subject: "VISITA CONFIRMADA",
//       html:,
//     })
//     .then(() => console.log("Mensaje enviado"))
//     .catch((err) => console.error(err));
// };

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

//ENVIO DE MAIL CITA ACEPTADA

visitRouter.put("/dateConfirm", (req, res) => {
  const mail = req.body.to;
  confirmDate(mail);
});

// visitRouter.put("/dateReschedule", (req, res) => {
//   const mail = req.body.to;
//   confirmDate(mail);
// });

//ruta informacion de esa citas

visitRouter.get("/", (req, res) => {
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
