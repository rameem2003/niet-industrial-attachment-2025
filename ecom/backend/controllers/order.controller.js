const cartModel = require("../model/cart.model");
const orderModel = require("../model/order.model");
const userModel = require("../model/user.model");
const sslcz = require("../utils/paymentgateway");
const generateToken = require("../utils/token");

// all orders
const allOrders = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }
  try {
    let orders = await orderModel.find().populate("items.item");
    res.send(orders);
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// create new order
const createNewOrder = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let { address } = req.body;

  let cartData = await cartModel
    .find({ userId: req.user.id })
    .populate("userId")
    .populate("item");

  let grandTotal = cartData.reduce((total, cartItem) => {
    const price = cartItem?.item?.sellingPrice || 0;
    const quantity = cartItem?.quantity || 0;
    return total + price * quantity;
  }, 0);

  let orderItems = cartData.map((cartItem) => ({
    item: cartItem.item,
    quantity: cartItem.quantity,
  }));

  let token = generateToken();

  await cartModel.deleteMany({ userId: req.user.id });

  let newOrder = new orderModel({
    userId: req.user.id,
    address,
    items: orderItems,
    grandTotal,
    transactionId: token,
  });

  await newOrder.save();

  await userModel.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { orderList: newOrder._id } },
    { new: true }
  );
  const data = {
    total_amount: grandTotal,
    currency: "BDT",
    tran_id: token, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/order/success?id=${newOrder._id}`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "product 1",
    product_category: "cataegory 1",
    product_profile: "cataegory 1",
    cus_name: req.user.name,
    cus_email: req.user.email,
    cus_add1: address,
    cus_add2: address,
    cus_city: address,
    cus_state: address,
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: req.user.phone,
    cus_fax: req.user.phone,
    ship_name: req.user.name,
    ship_add1: address,
    ship_add2: address,
    ship_city: address,
    ship_state: address,
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  sslcz.init(data).then((apiResponse) => {
    console.log(apiResponse);

    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
    res.send({ GatewayPageURL });
    // url = GatewayPageURL;
  });
};

// order success
const successOrder = async (req, res) => {
  let { id } = req.query;

  await orderModel.findOneAndUpdate(
    { _id: id },
    { $set: { orderConfirmed: true } }
  );

  res.status(200).send("<h1>Order is confirmed</h1>");
};

module.exports = { createNewOrder, successOrder, allOrders };
