const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");
const fs = require("fs");
const path = require("path");

// get all products
const getAllProducts = async (req, res) => {
  try {
    let allProducts = await productModel
      .find()
      .populate("category")
      .populate("userId");

    res.status(200).send({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// get single porduct
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let singleProduct = await productModel
      .findOne({ _id: id })
      .populate("category")
      .populate("userId");
    return res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      data: singleProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// create new product
const createNewProduct = async (req, res) => {
  console.log(req.files);
  //   return res.send("ok");

  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { name, description, sellingPrice, discountPrice, category } = req.body;

  let images = req.files.map((image) => {
    return `${req.protocol}://${req.host}/${image.filename}`;
  });

  try {
    let newProduct = new productModel({
      name,
      description,
      sellingPrice,
      discountPrice,
      category,
      userId: req.user.id,
      images,
    });

    await newProduct.save();

    await categoryModel.findOneAndUpdate(
      { _id: category },
      {
        $push: {
          products: newProduct._id,
        },
      }
    );

    res.status(201).send({
      success: true,
      message: "New Product Created",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// update product
const updateProduct = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { id } = req.params;

  let updateFields = {};
  let allowedFields = ["name", "description", "sellingPrice", "discountPrice"];
  // let thumb = req?.file?.filename;

  allowedFields.map((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field]; // updateFields.name = data
    }
  });

  let images = req.files.map((image) => {
    return `${req.protocol}://${req.host}/${image.filename}`;
  });

  try {
    if (images.length == 0) {
      let targetProduct = await productModel.findOneAndUpdate(
        { _id: id },
        { $set: updateFields }
      );

      return res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        data: targetProduct,
      });
    } else {
      let targetProduct = await productModel.findOneAndUpdate(
        {
          _id: id,
        },
        { $set: { ...updateFields, images } }
      );

      targetProduct.images.map((image) => {
        let split = image.split("/");
        let actualFileName = split[split.length - 1];
        fs.unlink(
          `${path.join(__dirname, "../uploads/product/", actualFileName)}`,
          (err) => {
            if (err) {
              console.log(err);
            }

            console.log("File delete");
          }
        );
      });

      return res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        data: targetProduct,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }
  const { id } = req.params;

  try {
    let targetProduct = await productModel.findOneAndDelete({ _id: id });
    // await categoryModel.findOneAndDelete({_id : targetProduct.category})
    await categoryModel.findOneAndUpdate(
      { _id: targetProduct.category },
      {
        $pull: {
          products: targetProduct._id,
        },
      }
    );

    targetProduct.images.map((image) => {
      let split = image.split("/");
      let actualFileName = split[split.length - 1];
      fs.unlink(
        `${path.join(__dirname, "../uploads/product/", actualFileName)}`,
        (err) => {
          if (err) {
            console.log(err);
          }

          console.log("File delete");
        }
      );
    });

    res.status(200).send({
      success: true,
      message: "Product Deleted",
      data: targetProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
