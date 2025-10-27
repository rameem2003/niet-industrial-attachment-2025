const categoryModel = require("../model/category.model");
const fs = require("fs");
const path = require("path");

const createNewCategory = async (req, res) => {
  console.log(__dirname);

  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { name, description } = req.body;
  let thumb = req?.file?.filename;

  if (!thumb) {
    return res
      .status(400)
      .send({ success: false, message: "Category thumb must be needed" });
  }
  try {
    let newcategory = new categoryModel({
      name,
      description,
      userId: req.user.id,
      thumb: `http://localhost:5000/${thumb}`,
    });

    await newcategory.save();

    return res.status(201).send({
      success: true,
      message: "New Category Created",
      data: newcategory,
    });
  } catch (error) {
    // F:\Rameem\niet-ia\niet-industrial-attachment-2025\ecom\backend\controllers
    // F:\Rameem\niet-ia\niet-industrial-attachment-2025\ecom\backend\uploads\category
    // F:\Rameem\niet-ia\niet-industrial-attachment-2025\ecom\backend\uploads\category\thumb-name
    fs.unlink(
      `${path.join(__dirname, "../uploads/category/", thumb)}`,
      (err) => {
        if (err) {
          console.log(err);
        }

        console.log("File delete");
      }
    );
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNewCategory,
};
