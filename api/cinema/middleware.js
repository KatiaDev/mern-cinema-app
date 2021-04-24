const Cinemas = require("./model");

const validateCinema = (req, res, next) => {
  const { name, location, contact } = req.body;

  if (!name || !location || !contact) {
    return res.status(400).json({ message: "Missing required field." });
  } else {
    next();
  }
};

const checkCinemaExists = async (req, res, next) => {
  try {
    const foundCinema = await Cinemas.findById(req.params.cinema_id).exec();
    if (!foundCinema) {
      return res.status(404).json({ message: "Not found." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validateCinema, checkCinemaExists };
