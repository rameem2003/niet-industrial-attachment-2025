const cartModel = require("../model/cart.model");

const viewCart = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }
  try {
    let userCart = await cartModel
      .find({ userId: req.user.id })
      .populate("item");

    userCart.map((cartItem) => {
      console.log(cartItem.item.sellingPrice);
    });

    let grandTotal = userCart.reduce((total, cartItem) => {
      const price = cartItem?.item?.sellingPrice || 0;
      const quantity = cartItem?.quantity || 0;
      return total + price * quantity;
    }, 0);

    console.log(grandTotal);

    return res.status(200).send({
      success: true,
      message: "Cart Items",
      data: userCart,
      grandTotal,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { item } = req.params;

  try {
    let existCart = await cartModel.findOne({ userId: req.user.id, item });

    if (!existCart) {
      let newCart = cartModel({ userId: req.user.id, item });
      await newCart.save();

      return res.status(201).send({
        success: true,
        message: "Item Added to Cart",
        data: newCart,
      });
    } else {
      existCart.quantity++;
      existCart.save();

      return res.status(201).send({
        success: true,
        message: "Item quantity increment to Cart",
        data: existCart,
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

const decrementCartItem = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { item } = req.params;

  try {
    let existCart = await cartModel.findOne({ userId: req.user.id, item });

    if (!existCart) {
      return res.status(404).send({
        success: false,
        message: "Item not found in Cart",
      });
    } else {
      existCart.quantity--;
      await existCart.save();

      return res.status(200).send({
        success: true,
        message: "Item quantity decrement to Cart",
        data: existCart,
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

const removeItem = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { id } = req.params;

  try {
    let targetcart = await cartModel.findOneAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      messege: "Item Deleted",
      data: targetcart,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { viewCart, addToCart, decrementCartItem, removeItem };
