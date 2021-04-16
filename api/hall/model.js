const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
  seat_price: {
    type: Number,
    required: true,
  },
  seat_status: {
    type: Boolean,
  },
});

const hallModel = mongoose.model("Halls", hallSchema);

module.exports = hallModel;
