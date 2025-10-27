const multer = require("multer");
const fs = require("fs");
const path = require("path");
const generateToken = require("../utils/token");
const createUploadMiddleware = ({ type }) => {
  // Set allowed types and limits
  let allowedTypes = [];
  let maxSize = 0;
  let folderName = "";

  if (type === "profile") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 5 * 1024 * 1024; // 5MB
    folderName = "profile";
  } else if (type === "category") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 5 * 1024 * 1024; // 5MB
    folderName = "category";
  } else if (type === "product") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 5 * 1024 * 1024; // 5MB
    folderName = "product";
  } else {
    throw new Error("Invalid upload type. Must be 'image'.");
  }

  // Storage configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `./uploads/${folderName}`;
      // Ensure folder exists
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + generateToken();
      cb(null, uniqueSuffix + ext);
    },
  });

  // Filter
  // const fileFilter = (req, file, cb) => {
  //   if (allowedTypes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error(`Invalid file type for ${type}.`), false);
  //   }
  // };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    // fileFilter,
  });
};

module.exports = createUploadMiddleware;
