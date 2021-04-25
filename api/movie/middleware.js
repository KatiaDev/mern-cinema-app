const Movies = require("./model");

const validateMovie = (req, res, next) => {
  const {
    title,
    genre,
    release_date,
    description,
    age_restrict,
    image_url,
    video_url,
  } = req.body;

  if (
    !title ||
    !genre ||
    !release_date ||
    !description ||
    !age_restrict ||
    !image_url ||
    !video_url
  ) {
    return res.status(400).json({ message: "Missing required field." });
  } else {
    next();
  }
};

const checkMovieExists = async (req, res, next) => {
  try {
    const foundMovie = await Movies.findById(req.params.movie_id).exec();
    if (!foundMovie) {
      return res.status(404).json({ message: "Not found." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validateMovie, checkMovieExists };
