const { check, validationResult } = require("express-validator");
const Premieres = require("./model");

const validateNewPremiere = async (req, res, next) => {
  await check("movie")
    .trim()
    .notEmpty()
    .withMessage("movie is required")
    .custom((movie) => {
      return Premieres.findOne({ movie })
        .exec()
        .then((movie) => {
          if (!movie) {
            return res.status(404).json("Movie does not exist");
          }
        })
        .catch(next);
    })
    .run(req);

  await check("cinema")
    .custom((cinema) => {
      return Premieres.findOne({ cinema })
        .exec()
        .then((cinema) => {
          if (!cinema) {
            return res.status(404).json("Cinema not found");
          }
        })
        .catch(next);
    })
    .run(req);

  await check("premiere_date")
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
    .custom((premiere) => {
      return Premieres.findOne({ _id: req.params.premiere_id, active: true })
        .then((premiere) => {
          if (!premiere) {
            return res.status(404).json(" Premiere is not found ");
          }
        })
        .catch(next);
    })
    .run(req);

  next();
};

module.exports = {
  validateNewPremiere,
  checkPremiereExists,
};
