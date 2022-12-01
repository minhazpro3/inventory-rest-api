const {
  getProductServiceId,
  saveProductService,
  getProductService,
  updateProductService,
  bulkUpdateProductService,
} = require("../services/product.services");
const Product = require("../models/product");

// save products
exports.saveProduct = async (req, res, next) => {
  // save or create 2 types
  try {
    // type-1
    const product = new Product(req.body);
    // instance creation -> do something -> save()
    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    // const result = await product.save();
    const result = await saveProductService(product);
    // result.logger()

    // type-2
    // const result = await Product.create(req.body);
    res.status(200).send({
      status: "success save",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "Data is not inserted",
      error: error.message,
    });
  }
};

// get products with id
exports.getProductsWithId = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const products = await getProductServiceId(id);
    res.status(200).json({
      status: "success find with id",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "can't get data",
      error: error.message,
    });
  }
};

// get products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductService();
    console.log(products);
    res.status(200).json({
      status: "success find ",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "can't get data",
      error: error.message,
    });
  }
};

// update products
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const result = await updateProductService(id, req.body);
    res.status(200).json({
      status: "success update product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "can't update data",
      error: error.message,
    });
  }
};

// bulk update
exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success many update",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "can't update data",
      error: error.message,
    });
  }
};
