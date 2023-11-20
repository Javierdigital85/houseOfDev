const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// const db = require("./db");
const { userDb, propertyDb } = require("./db");
const envs = require("./config/envs");
const property = require("./config/property");
const cors = require("cors");
const authAPI = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api", authAPI);

userDb.sync({ force: false }).then(() => {
  console.log("Db connected");
  app.listen(envs.PORT, () => {
    console.log(` User Server listening at port ${envs.PORT}`);
  });
});

propertyDb.sync({ force: false }).then(() => {
  app.listen(property.PORT, () => {
    console.log(`Property Server listening at port ${property.PORT}`);
  });
});
