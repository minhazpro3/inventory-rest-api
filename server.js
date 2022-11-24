const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

//  database connections

mongoose
  .connect(process.env.DATABASE, {
    dbName: "inventory_API",
  })
  .then(() => {
    console.log("database connect is successful");
  });

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at on port ${PORT}`);
});
