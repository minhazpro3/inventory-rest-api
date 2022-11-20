const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("routing is working");
});

module.exports = app;
