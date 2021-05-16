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
    premiere_start: {
      type: Date,
      require: true,
    },

    premiere_end: {
      type: Date,
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
