const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");

//Fetch all products
//Get/api/products
//public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//Fetch single product
//Get/api/products/:id
//public
const getProductBYId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

module.exports = { getProductBYId, getProducts };
