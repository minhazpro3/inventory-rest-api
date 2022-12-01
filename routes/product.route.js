const express = require("express");
const productController = require("../controllers/products.controller");
const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.saveProduct);
router.route("/:id").get(productController.getProductsWithId);
router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/:id").patch(productController.updateProduct);

module.exports = router;

// router.route("/").post(userController.saveUser);
// router.route("/").get(userController.getUser);
