const mongoose = require("mongoose");

const premiereSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },

    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinemas",
    },
    premiere_date: {
      type: Array,
      require: true,
    },
    interval_hours: {
      type: Array,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    active: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const premiereModel = mongoose.model("Premieres", premiereSchema);
module.exports = premiereModel;
