const { check, validationResult } = require("express-validator");
const Premieres = require("./model");

const validateNewPremiere = async (req, res, next) => {
  await check("movie_id")
    .trim()
    .notEmpty()
    .withMessage("movie is required")
    .custom((movie) => {
      return Premieres.findById(movie)
        .exec()
        .then((movie) => {
          if (!movie) {
            throw "Movie does not exist";
          }
        })
        .catch(next);
    })
    .run(req);

  await check("cinema_id")
    .trim()
    .notEmpty()
    .withMessage("cinema is required")
    .custom((cinema) => {
      return Premieres.findById(cinema)
        .exec()
        .then((cinema) => {
          if (!cinema) {
            throw "Cinema does not exist";
          }
        })
        .catch(next);
    })
    .run(req);

  await check("reserv_date")
    .trim()
    .notEmpty()
    .withMessage("Date premiere is required")
    .isISO8601()
    .toDate()
    .withMessage("Wrong date format")
    .run(req);

  await check("price")
    .trim()
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("Unknown format")
    .run(req);

  await check("active")
    .trim()
    .notEmpty()
    .withMessage("status premiere is required")
    .isBoolean()
    .withMessage("Unknown format")
    .run(req);

  await check("interval_hours")
    .trim()
    .notEmpty()
    .withMessage("Interval runnig premiere is required")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }
  next();
};

const checkPremiereExists = async (req, res, next) => {
  await check("premiere_id")
    .trim()
    .notEmpty()
    .custom((premiere) => {
      return Premieres.findById(premiere)
        .then((premiere) => {
          if (!premiere) {
            throw " Premiere is not found ";
          }
        })
        .catch(next);
    })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }
  next();
};

module.exports = {
  validateNewPremiere,
  checkPremiereExists,
};
