const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 5,
      max: 20,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      enum: ["Dhaka", "London", "Canbera"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
