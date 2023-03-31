const { insertMany } = require("../models/product");
const Product = require("../models/product");

exports.getProductServiceId = async (id) => {
  const products = await Product.find({ _id: id });
  return products;
};
exports.getProductServiceAll = async () => {
  const products = await Product.find({});
  return products;
};

// get product query string
exports.getProductService = async (filters, queries) => {
  const products = await Product.find(filters)
    // .skip(queries.skip)
    // .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.shortBy);
  // const totalProducts = await Product.countDocuments(filters);
  // const countPage = Math.ceil(totalProducts / queries.limit);
  return {
    // totalProducts,
    // countPage,
    products,
  };
};

exports.saveProductService = async (product) => {
  const products = await Product.create(product);
  console.log(products);
  const { _id, brand } = products;

  return products;
};

exports.updateProductService = async (productId, data) => {
  const updates = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );

  return updates;
};

exports.bulkUpdateProductService = async (data) => {
  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  });
  return result;
};

exports.deleteProductServiceById = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.deleteAllProductsService = async (id) => {
  const result = await Product.deleteMany({});
  return result;
};
