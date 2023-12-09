const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const propertyRouter = express.Router();
const Property = require("../models/Property");
const { Error } = require("sequelize");

const storage = multer.diskStorage({});

const upload = multer({ storage: storage }).single("img");

propertyRouter.post("/register", upload, (req, res) => {
  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      const {
        province,
        city,
        address,
        number,
        onSale,
        price,
        squareMeters,
        bedrooms,
        bathrooms,
      } = req.body;
      return Property.create({
        province,
        city,
        address,
        number,
        onSale,
        price,
        squareMeters,
        bedrooms,
        bathrooms,
        img: result.secure_url,
      });
    })
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
  const searchQuery = req.query;

  Property.findAll({
    where: searchQuery,
  }).then((result) => res.status(200).send(result));
});

// propertyRouter.put("/update/:id", (req, res) => {
//   Property.update(req.body, { where: { id: req.params.id }, returning: true })
//     .then(([rows, propiedades]) => {
//       res.send(propiedades[0]);
//     })
//     .catch((error) => "no se pudo editar");
// });

propertyRouter.put("/update/:id", upload, (req, res) => {
  const { id } = req.params;
  console.log("ID de la propiedad a actualizar:", id);

  // Verifica si req.file está definido
  if (!req.file) {
    return res
      .status(400)
      .send("No se ha proporcionado un archivo para cargar.");
  }

  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      const {
        province,
        city,
        address,
        number,
        onSale,
        price,
        squareMeters,
        bedrooms,
        bathrooms,
      } = req.body;

      return Property.update(
        {
          province,
          city,
          address,
          number,
          onSale,
          price,
          squareMeters,
          bedrooms,
          bathrooms,
          img: result.secure_url,
        },
        {
          where: { id: req.params.id },
          returning: true,
        }
      );
    })
    .then(([rows, propiedades]) => {
      res.send(propiedades[0]);
    })
    .catch((Error) => console.error(Error));
});

module.exports = propertyRouter;
