const express = require("express");
const bodyParser = require("body-parser");
const Routes = require("./api/routes/Routes");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose

  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })

  .then(console.log("CONNECTED"))

  .catch((err) => {
    console.log("err", err);
  });

app.use(Routes);

app.listen(3001);
