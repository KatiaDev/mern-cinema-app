const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservations",
    require: false,
  },
  qrcode: {
    type: String,
    required: true,
  },
  pay_type: {
    type: String,
    require: true,
  },
  pay_date: {
    type: Date,
    required: true,
  },
});

const ticketModel = mongoose.model("Tickets", ticketSchema);
module.exports = ticketModel;
