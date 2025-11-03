const {
  createNewOrder,
  successOrder,
} = require("../../controllers/order.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");

const router = require("express").Router();

router.post("/create", checkUserMiddleware, createNewOrder);
router.post("/success", successOrder);

module.exports = router;
