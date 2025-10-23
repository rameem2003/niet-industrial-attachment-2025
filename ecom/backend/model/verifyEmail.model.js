const { default: mongoose } = require("mongoose");

const verifyEmailSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    token: {
      type: Number,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // 5 minute (in seconds)
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("verifyEmail", verifyEmailSchema);
