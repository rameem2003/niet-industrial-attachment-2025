const {
  addToCart,
  viewCart,
  removeItem,
} = require("../../controllers/cart.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");

const router = require("express").Router();

router.get("/items", checkUserMiddleware, viewCart);
router.post("/add/:item", checkUserMiddleware, addToCart);
router.delete("/delete/:id", checkUserMiddleware, removeItem);

module.exports = router;
