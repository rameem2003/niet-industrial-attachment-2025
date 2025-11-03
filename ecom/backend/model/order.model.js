const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    address: {
      type: String,
      required: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: Number,
      },
    ], //{ product , quantity}
    grandTotal: {
      type: Number,
      required: true,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      required: true,
    },

    orderConfirmed: {
      type: Boolean,
      default: false,
    },
    delivaryStatus: {
      type: String,
      enum: ["pending", "delivared", "cancel"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
