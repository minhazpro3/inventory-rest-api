const Product = require("../models/product");

exports.getProductServiceId = async (id) => {
  const products = await Product.find({ _id: id });
  return products;
};
exports.getProductService = async () => {
  const products = await Product.find({});
  return products;
};

exports.saveProductService = async (product) => {
  console.log(product);
  const products = await product.save();
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
