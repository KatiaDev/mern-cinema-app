const mongoose = require("mongoose");

const cinematografSchema = new mongoose.Schema({
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

const cinematografModel = mongoose.model("Cinematografphs", cinematografSchema);
module.exports = cinematografModel;
