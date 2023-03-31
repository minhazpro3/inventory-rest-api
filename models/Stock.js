const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;
// data schema design
const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectID,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please provide name of the product"],
      trim: true,
      unique: [true, "Please provide another stock name"],
      minLength: [3, "Please provide min 3 characters"],
      lowercase: true,
      maxLength: [100, "Name is to large"],
    },

    description: {
      type: String,
      required: true,
    },

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

    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
    },

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

    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide store name"],
        enum: {
          values: [
            "Dhaka",
            "rangpur",
            "rajshahi",
            "Chattogram",
            "sylhet",
            "barishal",
            "mymensing",
          ],
          message: "{VALUE} is not a valid name",
        },
        lowercase: true,
      },
      id: {
        type: ObjectID,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: [true, "Please provide supplier name"],
        trim: true,
      },
      id: {
        type: ObjectID,
        ref: "Supplier",
      },
    },
  },

  // schema options
  {
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

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
