const {
  getProductServiceId,
  saveProductService,
  getProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductServiceById,
  deleteAllProductsService,
  getProductServiceAll,
} = require("../services/product.services");
const Product = require("../models/product");
const { query } = require("express");

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
    const result = await saveProductService(req.body);
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
exports.getProductsAll = async (req, res, next) => {
  try {
    const products = await getProductServiceAll();

    if (!products.length == 0) {
      res.status(200).json({
        status: "success find ",
        data: products,
      });
    } else {
      res.status(200).json({
        status: "could not find data",
        data: "data is empty!",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "can't get data",
      error: error.message,
    });
  }
};

// get product query string
exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    // sort , page, limit => exclude
    const excludeFields = ["limit"];
    excludeFields.forEach((fields) => delete filters[fields]);

    // operators of filters => gt, lt, gte, lte .

    // obj to stringify
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);

    const queries = {};
    if (req.query.sort) {
      const shortBy = req.query.sort.split(",").join(" ");
      queries.shortBy = shortBy;
    }
    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(",").join(" ");
      queries.fields = fieldsBy;
    }

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    const products = await getProductService(filters, queries);

    if (!products.length == 0) {
      res.status(200).json({
        status: "success find ",
        data: products,
      });
    } else {
      res.status(200).json({
        status: "could not find data",
        data: "data is empty!",
      });
    }
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
// delete product by id
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductServiceById(id);

    if (!result.deletedCount) {
      return res.status(404).json({
        status: "Fail",
        error: "could not find data",
      });
    }

    res.status(200).json({
      status: "success delete product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "can't delete product",
      error: error.message,
    });
  }
};

// delete all products
exports.deleteAllProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteAllProductsService();

    if (!result.deletedCount) {
      return res.status(404).json({
        status: "Fail",
        error: "could not find data",
      });
    }

    res.status(200).json({
      status: "success delete product all",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "can't delete product all",
      error: error.message,
    });
  }
};
