const express = require("express");
const {
  getProducts,
  getProductBYId,
} = require("../controllers/productControllers");

const router = express.Router();

//get all products route
router.route("/").get(getProducts);

//get single product route
router.route("/:id").get(getProductBYId);

module.exports = router;
