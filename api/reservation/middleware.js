const { check, validationResult } = require("express-validator");
const Reservations = require("./model");
const Seats = require("../seat/model");
const Premieres = require("../premiere/model");
const Users = require("../user/model");

const validateNewReservation = async (req, res, next) => {
  await check("premiere")
    .trim()
    .notEmpty()
    .withMessage("Premiere movie is required.")
    .run(req);

  await check("seats").notEmpty().withMessage("Seat is required.").run(req);

  await check("reserv_date")
    .trim()
    .notEmpty()
    .withMessage("Date reservation is required.")
    .isISO8601()
    .toDate()
    .withMessage("Wrong date format.")
    .run(req);

  await check("total_price")
    .trim()
    .notEmpty()
    .withMessage("Total price is required.")
    .isNumeric()
    .withMessage("Unknown format.")
    .run(req);

  await check("client_type")
    .trim()
    .notEmpty()
    .withMessage("Client type  is required.")
    .isIn(["Copil", "Elev", "Student", "Adult", "Pensionar"])
    .withMessage("Undefined client type.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  if (req.body.premiere) {
    Premieres.findOne({ _id: req.body.premiere })
      .exec()
      .then((premiere) => {
        if (
          premiere.premiere_start_date <= req.body.reserv_date &&
          premiere.premiere_end_date >= req.body.reserv_date
        ) {
          const premiereHoursExists = premiere.interval_hours.filter(
            (el) => el === req.body.reserv_hour
          );

          if (premiereHoursExists.length !== 0) {
            return next();
          }
          return res
            .status(403)
            .json("there is no premiere on the selected time");
        } else {
          console.log("Data nu e ok");
          return res
            .status(403)
            .json("there is no premiere on the selected date and time");
        }
      });
  } else {
    return next();
  }
};

//------------------------------------------------------------------------------------------//
const checkReservationExists = async (req, res, next) => {
  Reservations.findById(req.params.reservation_id)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).json("Reservation is not found.");
      } else {
        next();
      }
    })
    .catch(next);
};

//------------------------------------------------------------------------------------------//
const restrictedReservation = async (req, res, next) => {
  Users.findById(req.body.parent_user)
    .exec()
    .then((user) => {
      console.log(user);
    });
};
//------------------------------------------------------------------------------------------//
const checkSeatIsAvailable = async (req, res, next) => {
  Reservations.findOne({
    premiere: req.body.premiere,
    seat: req.body.seat,
    reserv_date: req.body.reserv_date,
    reserv_hour: req.body.reserv_hour,
  })
    .exec()
    .then((reservation) => {
      if (reservation) {
        return res.status(422).json(`Sorry, seat ${req.body.seats} is taken !`);
      } else {
        next();
      }
    })
    .catch(next);
};

module.exports = {
  validateNewReservation,
  checkReservationExists,
  checkSeatIsAvailable,
};
