const { check, validationResult } = require("express-validator");
const Premieres = require("./model");
const Movies = require("../movie/model");
const Cinemas = require("../cinema/model");

const validateNewPremiere = async (req, res, next) => {
  await check("movie")
    .trim()
    .notEmpty()
    .withMessage("Movie is required.")
    .custom((movie) => {
      return Movies.findOne({ _id: movie })
        .then((movie) => {
          if (!movie) {
            return res.status(404).json("Movie does not exist.");
          }
        })
        .catch(next);
    })
    .run(req);

  await check("cinema")
    .trim()
    .notEmpty()
    .withMessage("Cinema is required.")
    .custom((cinema) => {
      return Cinemas.findOne({ _id: cinema })
        .then((cinema) => {
          if (!cinema) {
            return res.status(404).json("Cinema not found.");
          }
        })
        .catch(next);
    })
    .run(req);

  await check("premiere_date")
    .notEmpty()
    .isArray({ min: 1 })
    .withMessage("Date of premiere is required.")
    .run(req);

  await check("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required.")
    .isNumeric()
    .withMessage("Unknown format.")
    .run(req);

  await check("interval_hours")
    .notEmpty()
    .isArray({ min: 1 })
    .withMessage("Interval runnig premiere is required.")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

const checkPremiereExists = async (req, res, next) => {
  Premieres.findOne({ _id: req.params.premiere_id, acive: true })
    .then((premiere) => {
      if (!premiere) {
        return res.status(404).json(" Premiere is not found. ");
      } else {
        next();
      }
    })
    .catch(next);
};

module.exports = {
  validateNewPremiere,
  checkPremiereExists,
};
