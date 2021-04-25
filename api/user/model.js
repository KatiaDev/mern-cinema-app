const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  mobile: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
