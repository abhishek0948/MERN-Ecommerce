const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db.js");
const routes = require("./routes/index.js");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const PORT = 8080 || process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected to DB");
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
