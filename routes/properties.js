const express = require("express");
const propertyRouter = express.Router();
const Property = require("../models/Property");
const { Error } = require("sequelize");

propertyRouter.post("/register", (req, res) => {
  Property.create(req.body)
    .then((property) => res.status(201).send(property))
    .catch((Error) => console.error(Error));
});

propertyRouter.get("/all", (req, res) => {
  Property.findAll().then((property) => {
    res.send(property);
  });
});

propertyRouter.delete("/admin/:id", (req, res) => {
  Property.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.sendStatus(202);
  });
});

//ruta informacion de todos las propiedades
propertyRouter.get("/alquiler", (req, res) => {
  const { ubicacion } = req.query;
  if (ubicacion === "all") {
    console.log(ubicacion, "falseeeeeeeeee");
    Property.findAll({
      where: { onSale: false },
    })
      .then((properties) => res.status(200).send(properties))
      .catch((error) => console.log(error));
  } else {
    Property.findAll({
      where: { onSale: false, province: ubicacion },
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
  const { ubicacion } = req.query;
  if (ubicacion === "all") {
    Property.findAll({
      where: { onSale: true },
    })
      .then((properties) => res.status(200).send(properties))
      .catch((error) => console.log(error));
  } else {
    Property.findAll({
      where: { onSale: true, province: ubicacion },
    })
      .then((property) => {
        res.send(property);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "Error al obtener todos las propiedades" });
      });
  }
});

propertyRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  Property.findOne({ where: { id: req.params.id } }).then((property) =>
    res.status(200).send(property)
  );
});

propertyRouter.get("/", (req, res) => {
  const searchQuery = Object.keys(req.query);
  console.log("SEARCH QUERY TE DIJE", searchQuery);
  // Property.findAll({
  //   where: { searchQuery },
  // }).then((result) => console.log(result));
});

propertyRouter.put("/update/:id", (req, res) => {
  Property.update(req.body, { where: { id: req.params.id }, returning: true })
    .then(([rows, propiedades]) => {
      res.send(propiedades[0]);
    })
    .catch((error) => console.log("no se pudo editar"));
});

module.exports = propertyRouter;
