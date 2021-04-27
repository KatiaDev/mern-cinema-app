const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    //  608712a3113005679c4b6f3a
    premier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Premieres",
      require: true,
    },

    seat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seats",
      require: true,
    },

    parent_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },

    reserv_date: {
      type: Date,
      required: true,
    },

    total_price: {
      type: Number,
    },
    user_type: [],
  },
  {
    timestamps: true,
  }
);

const reservationModel = mongoose.model("Reservations", reservationSchema);
module.exports = reservationModel;
