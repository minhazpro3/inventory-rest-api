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
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    // supplier collection embeded fix module
    category: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  // schema options
  {
    timestamps: true,
  }
);

app.get("/", (req, res) => {
  res.send("routing is working");
});

module.exports = app;
