const router = require("express").Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
// http://localhost:5000/api/auth
router.use("/api/auth", auth);

// http://localhost:5000/api/category
router.use("/api/category", category);

// http://localhost:5000/api/products
router.use("/api/product", product);
module.exports = router;
