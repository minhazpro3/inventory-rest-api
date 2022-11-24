const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// data schema design
const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of the product"],
      trim: true,
      unique: [true, "Please provide another product name"],
      minLength: [3, "Please provide min 3 characters"],
      maxLength: [100, "Name is to large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be Negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litter", "pcs"],
        error: "unit must be kg/litter/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "can't be negative"],
      // custom validation. I can be use regex
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be Integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {value}",
      },
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,

    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // }

    // supplier collection reference
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // supplier collection embeded fix module
    // category: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },

  // schema options
  {
    collection: "supplierProducts",
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre / post
productsSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});
// productsSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

// mongoose methods
productsSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

const Product = mongoose.model("Products", productsSchema);

app.get("/", (req, res) => {
  res.send("routing is working");
});

// posting in database
app.post("/api/v1/product", async (req, res, next) => {
  // save or create 2 types
  try {
    // type-1
    const product = new Product(req.body);
    // instance creation -> do something -> save()
    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    const result = await product.save();
    // result.logger()

    // type-2
    // const result = await Product.create(req.body);
    res.status(200).send({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "Data is not inserted",
      error: error.message,
    });
  }
});

app.get("/api/v1/product", async (req, res, next) => {
  try {
    const products = await Product.find({ _id: "637b18ebaa89e3a9e439e990" });
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "can't get data",
      error: error.message,
    });
  }
});

module.exports = app;
