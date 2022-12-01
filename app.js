const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product.route");

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("routing is working");
});

// products control
app.use("/api/v1/product", productRoute);

module.exports = app;
