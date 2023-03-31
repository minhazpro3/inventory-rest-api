const express = require("express");
const storeController = require("../controllers/store.controller");
const router = express.Router();

router.route("/").post(storeController.createStore);
router.route("/").get(storeController.getStore);

module.exports = router;
