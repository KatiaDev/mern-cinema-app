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
    required: true,
  },
});

const cinemaModel = mongoose.model("Cinemas", cinemaSchema);
module.exports = cinemaModel;
