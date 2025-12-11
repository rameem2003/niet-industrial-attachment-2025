const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/token");
const verifyEmailModel = require("../model/verifyEmail.model");
const mail = require("../utils/email");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existEmail = await userModel.findOne({ email });
    console.log(existEmail);

    if (existEmail) {
      return res.status(401).send({
        success: false,
        message: "Email already Exist",
      });
    }

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

        let verificationlink = `${req.protocol}://${req.host}/api/auth/verify?email=${email}&token=${token}`;

        // https://api-niet.com/
        // protocol://(domain / host)
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
    
    <div class="code">${verificationlink}</div>

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
            expiresIn: "50m",
          });

          res.cookie("token", token, {
            maxAge: 60000 * 50, // 50 min
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

const verifyUser = async (req, res) => {
  const { email, token } = req.query;
  console.log(email, token);

  try {
    let tokenExist = await verifyEmailModel
      .findOne({ token })
      .populate("userID");

    if (!tokenExist) {
      return res.status(404).send({
        success: false,
        message: "Token Not Found",
      });
    }
    console.log(tokenExist);

    let user = await userModel.findOneAndUpdate(
      { _id: tokenExist.userID._id },
      { isVerify: true },
      { new: true }
    );

    await verifyEmailModel.deleteOne({ _id: tokenExist._id });

    res.status(200).send("<h1>Email Verification Complete</h1>");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const resendVerificationEmail = async (req, res) => {
  let { email } = req.body;

  try {
    let userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.status(404).send({
        success: false,
        message: "Email Not Found",
      });
    }

    let token = generateToken();

    await verifyEmailModel.deleteMany({ userID: userExist._id });

    let sendToken = new verifyEmailModel({ userID: userExist._id, token });
    await sendToken.save();

    let verificationlink = `http://localhost:5000/api/auth/verify?email=${email}&token=${token}`;

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
    <p>Hi ${userExist.name},</p>
    <p>Thank you for signing up!</p>
    <p>Please use the verification code below to verify your email address:</p>
    
    <div class="code">${verificationlink}</div>

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

    await mail(userExist.email, "Verify your email", body);

    res.status(200).send({
      success: true,
      message: "Verification Email Sent",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateUserPassword = async (req, res) => {
  console.log(req.user);

  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  try {
    let existUser = await userModel.findOne({ _id: req.user.id });

    if (!existUser) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized User",
      });
    } else {
      bcrypt.compare(oldPassword, existUser.password, (err, data) => {
        console.log(data);
        // return;
        if (err) {
          return res.status(401).send({
            success: false,
            message: "Unauthorized User",
          });
        } else if (data == false) {
          return res.status(404).send({
            success: false,
            message: "Password Didn't Matched",
          });
        } else {
          if (newPassword == confirmNewPassword) {
            bcrypt.hash(newPassword, 10, async function (err, hash) {
              if (err) {
                return res.status(500).send({
                  success: false,
                  message: "Internal Server Error",
                });
              } else {
                let newPass = await userModel.findOneAndUpdate(
                  { _id: existUser._id },
                  { password: hash },
                  { new: true }
                );

                res.status(200).send({
                  success: true,
                  message: "Password UPdate success",
                  data: newPass,
                });
              }
            });
          } else {
            return res.status(401).send({
              success: false,
              message: "New Password didnot match",
            });
          }
        }
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

const editUserProfile = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }

  let profilePicture = req?.file?.filename;
  let updateFields = {};
  let allowedFields = ["name", "phone", "address"];

  allowedFields.map((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field]; // updateFields.name = data
    }
  });

  if (profilePicture) {
    try {
      let updateProfile = await userModel.findOneAndUpdate(
        { _id: req.user.id },
        { updateFields, image: `http://localhost:5000/${profilePicture}` },
        {
          new: true,
        }
      );
      return res.status(200).send({
        success: true,
        message: "Profile Update Success",
        data: updateProfile,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  try {
    let updateProfile = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      updateFields,
      {
        new: true,
      }
    );
    return res.status(200).send({
      success: true,
      message: "Profile Update Success",
      data: updateProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const userProfile = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unathorised User" });
  }
  try {
    let user = await userModel.findOne({ _id: req.user.id }).populate({
      path: "orderList", // 1st path orderList ->
      populate: {
        path: "items.item", // 2nd path items -> item
        model: "product", // check the model to expose the item information
      },
    });

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

const logoutUser = async (req, res) => {
  res.clearCookie("token");

  res.status(200).send({
    success: true,
    message: "User Logged out",
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  resendVerificationEmail,
  updateUserPassword,
  editUserProfile,
  userProfile,
  userDelete,
  updateUser,
  logoutUser,
};
