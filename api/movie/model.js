const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: { type: String },
  description: { type: String },
  actors: { type: Array },
  age_restrict: { type: Number },
  duration: { type: String },
  image: { type: String },
  trailer: { type: String },
});

const movieModel = mongoose.model("Movies", movieSchema);

module.exports = movieModel;
