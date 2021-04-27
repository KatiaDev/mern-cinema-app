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
      type: Array,
      required: true,
    },
    director: {
      type: String,
    },
    release_date: {
      type: Date,
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
      type: String,
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
