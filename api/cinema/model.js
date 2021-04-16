const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    contact: true,
  },
});

const cinemaModel = mongoose.model("Cinemas", cinemaSchema);
module.exports = cinemaModel;
