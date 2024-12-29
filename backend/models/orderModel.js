const mongoose = require("mongoose");

const orderModelSchema = new mongoose.Schema(
  { 
    productDetails :{
        type: Array,
        default: []
    },
    email: {
        type: String,
        default: ""
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    paymentDetails: {
        paymentId:{
            type: String,
            default: ""
        },
        payment_method_types: {
            type: Array,
            default: []
        },
        payment_status: {
            type: String,
            default: ""
        }
    },
    shipping_options :{
        type: Array,
        default: []
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    address: {
        type: Object,
        default: {}
    }
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderModelSchema);
module.exports = orderModel;
