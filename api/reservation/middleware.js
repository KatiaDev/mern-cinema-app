const { check, validationResult } = require("express-validator");
const Reservations = require("./model");
const Seats = require("../seat/model");
const Premieres = require("../premiere/model");
const Users = require("../user/model");

const validateNewReservation = async (req, res, next) => {
  await check("premiere")
    .trim()
    .notEmpty()
    .withMessage("Premiere movie is required")
    .custom((premiere) => {
      return Premieres.findOne({ premiere })
        .exec()
        .then((premiere) => {
          if (!premiere || premiere.active === false) {
            return res
              .status(404)
              .json(
                "The premiere of the selected movie is currently unavailable"
              );
          }
        })
        .catch(next);
    })
    .run(req);

  await check("seat")
    .trim()
    .notEmpty()
    .withMessage("Seat is required")
    .custom((seat) => {
      return Seats.findOne({ seat })
        .exec()
        .then((seat) => {
          if (!seat || seat.available === false) {
            return res.status(404).json("Seat is taken!!!");
          }
        })
        .catch(next);
    })
    .run(req);

  await check("parent_user")
    .trim()
    .notEmpty()
    .withMessage("User is required for reservation")
    .custom((user) => {
      return Users.findOne({ user })
        .exec()
        .then((user) => {
          if (!user || user.active == false) {
            return res.status(404).json("User does not exist");
          }
        })
        .catch(next);
    })
    .run(req);

  await check("reserv_date")
    .trim()
    .notEmpty()
    .withMessage("Date reservation is required")
    .isISO8601()
    .toDate()
    .withMessage("Wrong date format")
    .run(req);

  await check("total_price")
    .trim()
    .notEmpty()
    .withMessage("Total price is required")
    .isNumeric()
    .withMessage("Unknown format")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }
  next();
};

const checkReservationExists = async (req, res, next) => {
  Reservations.findById(req.params.reservation_id)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).json("Reservation is not found ");
      }
      next();
    })
    .catch(next);
};

module.exports = {
  validateNewReservation,
  checkReservationExists,
};
