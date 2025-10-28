const {
  createNewCategory,
  getAllCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
} = require("../../controllers/category.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");
const createUploadMiddleware = require("../../middleware/fileupload");

const router = require("express").Router();
const upload = createUploadMiddleware({ type: "category" });

// get all category
router.get("/all", getAllCategory);

// get single category
router.get("/single/:id", getSingleCategory);

// create new category
router.post(
  "/create",
  checkUserMiddleware,
  upload.single("thumb"),
  createNewCategory
);

// update category
router.put(
  "/update/:id",
  checkUserMiddleware,
  upload.single("thumb"),
  updateCategory
);

// delete category
router.delete("/delete/:id", checkUserMiddleware, deleteCategory);

module.exports = router;
