const router = require("express").Router();
const auth = require("./auth");
const category = require("./category");

// http://localhost:5000/api/auth
router.use("/api/auth", auth);

// http://localhost:5000/api/category
router.use("/api/category", category);

// http://localhost:5000/api/products
module.exports = router;
