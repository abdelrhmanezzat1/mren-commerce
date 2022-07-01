const mongoose = require("mongoose");
const prodectScehma = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    catgory: { type: Array },
    color: { type: Array },
    size: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("prodect", prodectScehma);
