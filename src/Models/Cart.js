const mongoose = require("mongoose");
const Product = require("./Product");

const CartSchame = new mongoose.Schema({
  product: { type: Array, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", CartSchame);
