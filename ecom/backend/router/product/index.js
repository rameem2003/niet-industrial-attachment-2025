const {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../../controllers/product.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");
const createUploadMiddleware = require("../../middleware/fileupload");

const router = require("express").Router();
const upload = createUploadMiddleware({ type: "product" });

router.get("/all", getAllProducts);
router.get("/single/:id", getSingleProduct);

router.post(
  "/create",
  checkUserMiddleware,
  upload.array("images"),
  createNewProduct
);

router.patch(
  "/update/:id",
  checkUserMiddleware,
  upload.array("images"),
  updateProduct
);

router.delete("/delete/:id", checkUserMiddleware, deleteProduct);

module.exports = router;
