const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;
// data schema design
const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of the product"],
      trim: true,
      unique: [true, "Please provide another product name"],
      minLength: [3, "Please provide min 3 characters"],
      lowercase: true,
      maxLength: [100, "Name is to large"],
    },
    // brand: {
    //   type: String,
    //   required: [true, "Please provide brand name"],
    // },
    // thumbnail: {
    //   type: String,
    //   required: [true, "Please provide img url"],
    // },
    description: {
      type: String,
      required: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    //   min: [0, "Price can't be Negative"],
    // },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litter", "pcs", "bag"],
        error: "unit must be kg/litter/pcs/bag",
      },
    },

    imgURLs: [
      {
        type: String,
        // required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide valid img URLs",
        },
      },
    ],

    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
        id: {
          type: ObjectID,
          ref: "Brand",
          required: true,
        },
      },
    },
    // quantity: {
    //   type: Number,
    //   required: true,
    //   min: [0, "can't be negative"],
    //   // custom validation. I can be use regex
    //   validate: {
    //     validator: (value) => {
    //       const isInteger = Number.isInteger(value);
    //       if (isInteger) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     },
    //   },
    //   message: "Quantity must be Integer",
    // },
    // status: {
    //   type: String,
    //   required: true,
    //   enum: {
    //     values: ["in-stock", "out-of-stock", "discontinued"],
    //     message: "status can't be {value}",
    //   },
    // },
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
// productsSchema.methods.logger = function () {
//   console.log(`Data save for ${this.name}`);
// };

const Product = mongoose.model("Products", productsSchema);

module.exports = Product;
