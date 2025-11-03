const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [4, "Name must be at least 4 characters"],
      maxLength: [20, "Name must be at most 20 characters"],
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },

    orderList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
