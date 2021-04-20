const mongoose = require("mongoose");

const premiereSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
  },

  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinemas",
  },
  premiere_date: {
    type: Date,
    required: true,
  },
  interval_hours: [],
  price: {
    type: Number,
  },
});

const premiereModel = mongoose.model("Premieres", premiereSchema);
module.exports = premiereModel;
