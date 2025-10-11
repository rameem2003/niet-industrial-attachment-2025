const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join("../upload"));
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const fileName = uuidv4() + file.originalname;
    cb(null, fileName);
  }, // demo.txt // demo-
});

const upload = multer({ storage: storage });

module.exports = upload;
