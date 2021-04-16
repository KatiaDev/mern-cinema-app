const mongoose = require("mongoose");

const ticketSchema =  new mongoose.Schema({
  reservation: {
    type: mongoose.Types.ObjectId,
    ref: "Reservations",
  },
  qrcode: {
    type: String,
    required: true,
  },
  pay_date: {
    type: String,
    required: true,
  },
});

const ticketModel = mongoose.model("Tickets", ticketSchema);
module.exports = ticketModel;
