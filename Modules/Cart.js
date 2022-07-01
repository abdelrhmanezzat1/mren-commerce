const mongoose = require("mongoose");
const CartScehma = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true },
    prodects: [
      {
        prodectId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", CartScehma);
