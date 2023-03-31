const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectID } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a category name"],
      lowercase: true,
      unique: true,
    },
    description: String,
    imgUrl: {
      type: String,
      validate: [validator.isURL, "Please Provide a valid URL"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
