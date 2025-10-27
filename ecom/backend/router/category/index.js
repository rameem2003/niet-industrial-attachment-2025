const { createNewCategory } = require("../../controllers/category.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");
const createUploadMiddleware = require("../../middleware/fileupload");

const router = require("express").Router();
const upload = createUploadMiddleware({ type: "category" });

router.post(
  "/create",
  checkUserMiddleware,
  upload.single("thumb"),
  createNewCategory
);

module.exports = router;
