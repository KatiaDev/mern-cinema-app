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
  actors: {
    type: Array,
  },
  age_restrict: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },
});

const movieModel = mongoose.model("Movies", movieSchema);

module.exports = movieModel;
