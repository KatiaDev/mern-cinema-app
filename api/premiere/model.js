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
    premiere_start_date: {
      type: Date,
      required: true,
    },

    premiere_end_date: {
      type: Date,
      required: true,
    },

    interval_hours: [
      {
        type: String,
        require: true,
      },
    ],
    price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const premiereModel = mongoose.model("Premieres", premiereSchema);
module.exports = premiereModel;
