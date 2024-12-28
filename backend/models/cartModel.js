const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true, 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("addToCart", addToCartSchema);
module.exports = addToCartModel;
