const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  premier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Premieres",
  },

  seat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seats",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  reserv_date: {
    type: Date,
    required: true,
  },

  total_price: {
    type: Number,
  },
});

const reservationModel = mongoose.model("Premieres", reservationSchema);
module.exports = reservationModel;
