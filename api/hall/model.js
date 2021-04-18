const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinemas",
  },
  name: {
    type: String,
    required: true,
  },
  seats_total: {
    type: Number,
    required: true,
  },
});

const hallModel = mongoose.model("Halls", hallSchema);

module.exports = hallModel;
