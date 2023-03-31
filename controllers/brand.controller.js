const Brand = require("../models/Brands");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await Brand.create(req.body);

    res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "could't create the brand",
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const result = await Brand.find({});

    res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "could't find the brands",
    });
  }
};
