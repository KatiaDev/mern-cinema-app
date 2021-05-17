const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Halls",
  },
  seat_num: {
    type: Number,
    required: true,
  },
  row_num: {
    type: Number,
    required: true,
  },
  seat_type: {
    enum: ["Gold", "Standart", "Econom"],
    type: String,
    required: true,
  },
  seat_price: {
    type: Number,
    required: true,
  },
});

const seatModel = mongoose.model("Seats", seatSchema);

module.exports = seatModel;
