const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectID } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide store name"],
      unique: [true, "Already add {VALUE}"],
      enum: {
        values: [
          "dhaka",
          "rangpur",
          "rajshahi",
          "chattogram",
          "sylhet",
          "barishal",
          "mymensing",
        ],
        message: "{VALUE} is not a valid name",
      },
    },
    description: String,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectID,
        ref: "User",
      },
    },
  },
  {
    timeStamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
