const router = require("express").Router();
const auth = require("./auth");

// http://localhost:5000/api/auth
router.use("/api/auth", auth);

// http://localhost:5000/api/products
module.exports = router;
