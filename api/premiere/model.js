const mongoose = require("mongoose");

const premiereSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movies",
  },

  cinema: {
    type: mongoose.Types.ObjectId,
    ref: "Cinemas",
  },
  premiere_date: {
    type: Date,
    required: true,
  },

  price: {
    type: Number,
  },
});

const premiereModel = mongoose.model("Premieres", premiereSchema);
module.exports = premiereModel;
