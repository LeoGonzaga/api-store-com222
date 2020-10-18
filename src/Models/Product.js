const mongoose = require("mongoose");

const ProductSchame = new mongoose.Schema({
  description: { type: String, required: true },
  unitValue: { type: Number, required: true },
  rebate: { type: Number, required: true },

});

module.exports = mongoose.model("Product", ProductSchame);
