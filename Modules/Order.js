const mongoose = require("mongoose");
const OrderScehma = new mongoose.Schema(
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
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderScehma);
