const userModel = require("../model/user.model");

const user = async (req, res) => {
  try {
    let allUsers = await userModel.find();
    res.status(200).send({
      success: true,
      message: "Users found",
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const singleUser = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const addUser = async (req, res) => {
  let { name, email, password, phone, address } = req.body;

  try {
    console.log(req.body);

    let newUser = new userModel({ name, email, password, phone, address });
    await newUser.save();
    console.log("dwe");

    res.send({
      success: true,
      message: "New User Created",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  let { name, email, password, phone, address } = req.body;

  try {
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: id },
      { name, email, password, phone, address },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const userDelete = async (req, res) => {
  let { id } = req.params;

  try {
    let data = await userModel.findByIdAndDelete({ _id: id });
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User deleted",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { user, addUser, singleUser, userDelete, updateUser };
