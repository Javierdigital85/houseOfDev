const express = require("express");
const userRouter = express.Router();
const Users = require("../models/User");
const { Error } = require("sequelize");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middleware/auth");

userRouter.post("/register", (req, res) => {
  Users.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((Error) => console.error(Error));
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({
    where: { email },
  }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      else {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          superAdmin: user.superAdmin,
        };
        const token = generateToken(payload);
        console.log("TOKENNN", token);
        res.cookie("token", token);
        res.send(payload);
        console.log("usuario logueado", payload);
      }
    });
  });
});

userRouter.get("/passwordValidate", (req, res) => {
  const { password, email } = req.query;
  Users.findOne({
    where: { email: email },
  }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      else {
        res.status(200).send(true);
      }
    });
  });
});

//actualizacion de datos de usuario

userRouter.put("/update", (req, res) => {
  const { name, lastName, phone } = req.body;

  const { userEmail } = req.query;

  Users.update(
    {
      name,
      lastName,
      phone,
    },
    { where: { email: userEmail }, returning: true, plain: true }
  )
    .then(([rows, user]) => {
      res.status(201).send(user);
    })
    .catch((Error) => console.error(Error));
});

//actualizacion de password

userRouter.put("/updatePass", (req, res) => {
  const { password } = req.body;

  const { userEmail } = req.query;

  Users.update(
    {
      password,
    },
    { where: { email: userEmail }, returning: true, plain: true }
  )
    .then(([rows, user]) => {
      res.status(201).send(user);
    })
    .catch((Error) => console.error(Error));
});

userRouter.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
  console.log("token del usuario borrado");
});

//ruta informacion de todos los usuarios
userRouter.get("/allUsers", (req, res) => {
  Users.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener todos los usuarios" });
    });
});

//perfil del usuario logeado

userRouter.get("/profile", (req, res) => {
  const { email } = req.query;
  Users.findOne({
    where: { email: req.query.email },
  })
    .then((user) => res.status(200).send(user))
    .catch((Error) => console.error(Error));
});

//ruta informacion de un usuario
userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  Users.findByPk(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener datos de un usuario" });
    });
});

userRouter.put("/adminupdate/:id", (req, res) => {
  const { isAdmin } = req.body;

  console.log(req, "xxxxxxxxxxxxxxxxx");
  Users.update({ isAdmin }, { where: { id: req.params.id }, returning: true })
    .then(([rows, usuarios]) => {
      res.send(usuarios);
    })
    .catch((error) => console.log("no se pudo editar"));
});

module.exports = userRouter;
