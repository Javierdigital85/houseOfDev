const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const userProperties = require("./properties");

router.use("/users", userRouter);
router.use("/properties", userProperties);

module.exports = router;
