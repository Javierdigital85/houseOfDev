const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser");
const db = require("./db");
const envs = require("./config/envs");
const cors = require("cors");
const authAPI = require("./routes");

app.use(express.json());
// app.use(cookieParser());

app.use("/api", authAPI);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
db.sync({ force: false }).then(() => {
  console.log("Db connected");
  app.listen(envs.PORT, () => {
    console.log(`Server listening at port ${envs.PORT}`);
  });
});
