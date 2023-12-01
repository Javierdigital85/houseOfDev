const express = require("express");
const router = express.Router();

const userRouter = require("./users");
const userProperties = require("./properties");
const userCitas = require("./visits");
const userFavs = require("./favs");

router.use("/users", userRouter);
router.use("/properties", userProperties);
router.use("/visits", userCitas);
router.use("/favs", userFavs);

module.exports = router;
