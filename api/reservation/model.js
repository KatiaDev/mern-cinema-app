const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  premier: {
    type: mongoose.Types.ObjectId,
    ref: "Premieres",
  },

  seat: {
    type: mongoose.Types.ObjectId,
    ref: "Seats",
  },

  user: {
    type: mongoose.Types.ObjectId,
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
