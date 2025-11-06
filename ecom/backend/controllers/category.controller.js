const categoryModel = require("../model/category.model");
const fs = require("fs");
const path = require("path");

// all category
const getAllCategory = async (req, res) => {
  try {
    let allCategory = await categoryModel.find().populate("products");

    return res.status(200).send({
      success: true,
      message: "All Categories Fetched",
      data: allCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// get single category
const getSingleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    let singleCategory = await categoryModel.findOne({ _id: id });
    return res.status(200).send({
      success: true,
      message: "Single Category Fetched",
      data: singleCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// create new category
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
      thumb: `${req.protocol}://${req.host}/${thumb}`,
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

// update category
const updateCategory = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { id } = req.params;

  let updateFields = {};
  let allowedFields = ["name", "description"];
  let thumb = req?.file?.filename;

  allowedFields.map((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field]; // updateFields.name = data
    }
  });

  try {
    if (!thumb) {
      let targetCategory = await categoryModel.findOneAndUpdate(
        { _id: id },
        { $set: updateFields },
        { new: true }
      );

      return res.status(200).send({
        success: true,
        message: "Category Updated Successfully",
        data: targetCategory,
      });
    }

    // if thumb is there
    let targetCategory = await categoryModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...updateFields,
          thumb: `${req.protocol}://${req.host}/${thumb}`,
        },
      }
    );

    let split = targetCategory.thumb.split("/");
    let actualFileName = split[split.length - 1];
    fs.unlink(
      `${path.join(__dirname, "../uploads/category/", actualFileName)}`,
      (err) => {
        if (err) {
          console.log(err);
        }

        console.log("File delete");
      }
    );

    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      data: targetCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { id } = req.params;
  try {
    let deletedCategory = await categoryModel.findOneAndDelete({ _id: id });
    let split = deletedCategory.thumb.split("/");
    let actualFileName = split[split.length - 1];
    fs.unlink(
      `${path.join(__dirname, "../uploads/category/", actualFileName)}`,
      (err) => {
        if (err) {
          console.log(err);
        }

        console.log("File delete");
      }
    );

    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      data: deletedCategory,
    });

    // for testing purpose
    // let category = await categoryModel.findOne({ _id: id });
    // console.log(category.thumb);

    // let split = category.thumb.split("/");
    // let actualFileName = split[split.length - 1];
    // console.log(actualFileName);

    // res.send("ok");
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCategory,
  getSingleCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
