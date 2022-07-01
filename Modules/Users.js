const mongoose = require("mongoose");
const userScehma = new mongoose.Schema(
  {
    fristName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userScehma);
