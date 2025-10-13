const userModel = require("../model/user.model");

const user = async (req, res) => {
  try {
    let allUser = await userModel.find();
    res.status(200).send({
      success: true,
      data: allUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const addUser = async (req, res) => {
  let { name, phone, address } = req.body;

  try {
    let newUser = new userModel({
      name,
      phone,
      address,
    });

    await newUser.save();

    res.send({
      success: true,
      message: "New User Created",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const userDelete = (req, res) => {
  let { id } = req.params;

  // you can use findIndex and splice
  let index = array.findIndex((item) => item.id == id);
  if (index == -1) {
    res.status(404).send({
      success: false,
      message: "User not found",
    });
    return;
  }
  array.splice(index, 1);

  res.send({
    success: true,
    message: "User deleted success",
  });

  // also you can use filter
  // let newArray = array.filter((item) => item.name.toLowerCase() != name);
  // array = [];
  // array = newArray;

  // res.send({
  //   success: true,
  //   message: "User deleted success",
  // });
};

module.exports = { user, addUser, userDelete };
