const mongoose = require("mongoose");

const premiereSchema = new mongoose.Schema({
  film: {
    type: mongoose.Types.ObjectId,
    ref: "Films",
  },

  cinematograf: {
    type: mongoose.Types.ObjectId,
    ref: "Cinematografphs",
  },
  premier_date: {
    type: Date,
    required: true,
  },

  price: {
    type: Number,
  },
});

const premiereModel = mongoose.model("Premieres", premiereSchema);
module.exports = premiereModel;
