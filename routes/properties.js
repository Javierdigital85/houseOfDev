const express = require("express");
const propertyRouter = express.Router();
const Property = require("../models/Property");
const { Error } = require("sequelize");

propertyRouter.post("/register", (req, res) => {
  Property.create(req.body)
    .then((property) => res.status(201).send(property))
    .catch((Error) => console.error(Error));
});

// propertyRouter.get("/", (req, res) => {
//   const { ubicacion } = req.query;
//   console.log("xxxxxxxxxx", ubicacion);
//   if (ubicacion) {
//     Property.findAll({
//       where: {
//         city: ubicacion,
//       },
//     })
//       .then((properties) => res.status(200).send(properties))
//       .catch((error) => console.log(error));
//   }
//   //query
//   else {
//     Property.findAll()
//       .then((properties) => res.status(200).send(properties))
//       .catch((error) => console.log(error));
//   }
// });

//ruta informacion de todos las propiedades
propertyRouter.get("/alquiler", (req, res) => {
  const { ubicacion } = req.query;
  console.log("xxxxxxxxxx", req.query);
  console.log("ubicacionnnnn", ubicacion);
  if (ubicacion !== "") {
    console.log(ubicacion, "trueeeeeeeeee");
    Property.findAll({
      where: {
        province: ubicacion,
      },
    })
      .then((properties) => res.status(200).send(properties))
      .catch((error) => console.log(error));
  } else {
    console.log(ubicacion, "falseeeeee");
    Property.findAll({
      where: { onSale: false },
    })
      .then((property) => {
        res.status(200).send(property);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "Error al obtener todos las propiedades" });
      });
  }
});

propertyRouter.get("/comprar", (req, res) => {
  Property.findAll({
    where: { onSale: true },
  })
    .then((property) => {
      res.send(property);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener todos las propiedades" });
    });
});

propertyRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  Property.findOne({ where: { id: req.params.id } }).then((property) => {
    console.log("+++++++++++++++++++++++++++++PROPERTY+++++++++", property);
    res.status(200).send(property);
  });
});

module.exports = propertyRouter;
