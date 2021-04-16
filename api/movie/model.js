const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  description: {
    type: String,
  },
  actors: [],
  age_restrict: Number,
  duration: Number,
  //image: {},
  //trailer: {},
});

const movieModel = mongoose.model("Movies", movieSchema);

module.exports = movieModel;
