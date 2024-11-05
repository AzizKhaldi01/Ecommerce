// models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      enum: [
        "admin",
        "productManager",
        "orderManager",
        "teamManager",
        "statisticManager",
        "user",
      ],
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
