const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;
const validator = require("validator");

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide brand name"],
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid E-mail"],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL"],
    },
    location: String,
    products: [
      {
        type: ObjectID,
        ref: "Product",
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectID,
          ref: "supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timeStamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
