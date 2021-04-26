const { check, validationResult } = require("express-validator");
const Reservations = require("./model");
const Seats = require("../seat/model");
const Premieres = require("../premiere/model");
const Users = require("../user/model");

const validateNewReservation = async (req, res, next) => {
  await check("premier_id")
    .trim()
    .notEmpty()
    .withMessage("Premiera movie is required")
    .custom((premier) => {
      return Premieres.findById(premier)
        .exec()
        .then((premier) => {
          if (premier.active === false) {
            throw "The premiere of the selected movie is currently unavailable";
          }
        })
        .catch(next);
    })
    .run(req);

  await check("seat_id")
    .trim()
    .notEmpty()
    .withMessage("Seat is required")
    .custom((seat) => {
      return Seats.findById(seat)
        .exec()
        .then((seat) => {
          if (seat.seat_status === 0) {
            throw "Seat is not taken";
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
      return Users.findById(user)
        .exec()
        .then((user) => {
          if (user || user.active == false) {
            throw "User does not exist";
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
  await check("reservation_id")
    .notEmpty()
    .trim()
    .custom((reservation) => {
      return Reservations.findById(tireservationcket)
        .then((reservation) => {
          if (!reservation) {
            throw " Reservation is not found ";
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
  validateNewReservation,
  checkReservationExists,
};
