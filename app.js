const express = require("express");
const app = express();
const cors = require("cors");   
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const storeRoute = require("./routes/store.route");
const categoryRoute = require("./routes/category.route");

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("routing is working");
});

// products control
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/category", categoryRoute);

module.exports = app;
