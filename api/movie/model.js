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
  age_restrict: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  image_url: {
    type: String,
    require: true,
  },
  video_url: {
    type: String,
    require: true,
  },
});

const movieModel = mongoose.model("Movies", movieSchema);

module.exports = movieModel;
