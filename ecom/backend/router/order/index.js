const {
  createNewOrder,
  successOrder,
  allOrders,
} = require("../../controllers/order.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");

const router = require("express").Router();

router.get("/all", checkUserMiddleware, allOrders);
router.post("/create", checkUserMiddleware, createNewOrder);
router.post("/success", successOrder);

module.exports = router;
