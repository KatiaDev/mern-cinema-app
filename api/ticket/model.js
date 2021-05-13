const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservations",
      require: false,
    },
    qrcode: {
      type: String,
      require: true,
    },
    pay_type: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const ticketModel = mongoose.model("Tickets", ticketSchema);
module.exports = ticketModel;
