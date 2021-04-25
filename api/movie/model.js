const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    original_title: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    director: {
      type: String,
    },
    release_date: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
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
    },
    image_url: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const movieModel = mongoose.model("Movies", movieSchema);

module.exports = movieModel;
