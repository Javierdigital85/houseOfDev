const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const userProperties = require("./properties");
const userCitas = require("./visits");

router.use("/users", userRouter);
router.use("/properties", userProperties);
router.use("/visits", userCitas);

module.exports = router;
