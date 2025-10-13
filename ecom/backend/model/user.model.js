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
      type: String, // dhaka, khulna, rangpur
      enum: ["dhaka", "khulna", "rangpur"],
      required: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
