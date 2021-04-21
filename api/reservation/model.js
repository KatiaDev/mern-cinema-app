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

  parent_user: {
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
  user_type: [],
});

const reservationModel = mongoose.model("Reservations", reservationSchema);
module.exports = reservationModel;
