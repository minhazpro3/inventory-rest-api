const express = require("express");
const productController = require("../controllers/products.controller");
const router = express.Router();

router
  .route("/")
  // .get(productController.getProducts)
  .get(productController.getProductsAll)
  .post(productController.saveProduct);
router.route("/:id").get(productController.getProductsWithId);
router.route("/").delete(productController.deleteAllProducts);
router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/:id").patch(productController.updateProduct);
router.route("/:id")  .delete(productController.deleteProductById);

module.exports = router;

// router.route("/").post(userController.saveUser);
// router.route("/").get(userController.getUser);
