const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/token");
const verifyEmailModel = require("../model/verifyEmail.model");
const mail = require("../utils/email");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      // Store hash in your password DB
      if (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: err,
        });
      } else {
        let newUser = new userModel({ name, email, password: hash });

        await newUser.save();

        let token = generateToken();

        let sendToken = new verifyEmailModel({ userID: newUser._id, token });
        await sendToken.save();

        let body = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      padding: 20px;
      color: #333;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .code {
      font-size: 24px;
      font-weight: bold;
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      letter-spacing: 2px;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #777;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Verify Your Email Address</h2>
    <p>Hi ${newUser.name},</p>
    <p>Thank you for signing up!</p>
    <p>Please use the verification code below to verify your email address:</p>
    
    <div class="code">${token}</div>

    <p>This code will expire in 10 minutes.</p>
    <p>If you did not request this, you can safely ignore this email.</p>

    <p>Thanks,<br>The NIET Team</p>

    <div class="footer">
      &copy; 2025 NIET. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

        await mail(newUser.email, "Verify your email", body);

        res.status(201).send({
          success: true,
          message: "User Registration Success",
          data: newUser,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let existUser = await userModel.findOne({ email });

    if (existUser) {
      // bcrypt.compare(password, existUser.password)

      bcrypt.compare(password, existUser.password, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            success: false,
            message: err,
          });
        }
        if (data) {
          let userData = {
            id: existUser._id,
            name: existUser.name,
            email: existUser.email,
            phone: existUser.phone,
            address: existUser.address,
            isVerify: existUser.isVerify,
            image: existUser.image,
          };

          let token = jwt.sign(userData, process.env.JWT_KEY, {
            expiresIn: "1m",
          });

          res.cookie("token", token, {
            maxAge: 60000, // 1 min
          });

          res.status(200).send({
            success: true,
            message: "User Login Success",
            data: userData,
          });
        } else {
          res.status(404).send({
            success: false,
            message: "Invalid Credential",
          });
        }
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Invalid Credential",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

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

module.exports = {
  registerUser,
  loginUser,
  user,
  addUser,
  singleUser,
  userDelete,
  updateUser,
};
