const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const db = require("./db");
const { Property, User, Visit, Favs } = require("./models");
const envs = require("./config/envs");
const cors = require("cors");
const authAPI = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api", authAPI);

db.sync({ force: false }).then(() => {
  console.log("Db connected");
  app.listen(envs.PORT, () => {
    console.log(` User Server listening at port ${envs.PORT}`);
  });
});
