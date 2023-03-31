const Store = require("../models/Store");

exports.createStore = async (req, res, next) => {
  try {
    const state = await Store.create(req.body);

    res.status(200).send({
      status: "success save",
      message: "Data inserted successfully",
      data: state,
    });
  } catch (error) {
    res.status(400).send({
      status: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.getStore = async (req, res, next) => {
  try {
    const state = await Store.find({});

    res.status(200).send({
      status: "success ",
      message: "Data find successfully",
      data: state,
    });
  } catch (error) {
    res.status(400).send({
      status: "Data didn't find",
      error: error.message,
    });
  }
};
