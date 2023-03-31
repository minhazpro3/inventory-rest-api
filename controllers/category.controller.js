const Category = require("../models/Category");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(200).send({
      status: "success save",
      message: "Data inserted successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      status: "Data is not inserted",
      error: error.message,
    });
  }
};
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.find({});

    res.status(200).send({
      status: "success ",
      message: "Data find successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      status: "Data didn't find",
      error: error.message,
    });
  }
};
