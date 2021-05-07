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

  await check("seat")
    .trim()
    .notEmpty()
    .withMessage("Seat is required.")
    .run(req);

  await check("firstname")
    .trim()
    .notEmpty()
    .withMessage("Firstname is required.")
    .isLength({ min: 3 })
    .withMessage("Firstname must have minimum length of 3.")
    .run(req);

  await check("lastname")
    .trim()
    .notEmpty()
    .withMessage("Lastname is required.")
    .isLength({ min: 3 })
    .withMessage("Lastname must have minimum length of 3.")
    .run(req);

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

  await check("user_type")
    .trim()
    .notEmpty()
    .withMessage("User type price is required.")
    .isIn(["copil", "minor", "adult"])
    .withMessage("Undefined user type.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  if (req.body.premiere) {
    await Premieres.findOne({ _id: req.body.premiere })
      .then((premiere) => {
        if (!premiere || premiere.active === false) {
          return res
            .status(404)
            .json(
              "The premiere of the selected movie is currently unavailable."
            );
        }
      })
      .catch(next);
  }
  if (req.body.seat) {
    await Seats.findById(req.body.seat)
      .then((seat) => {
        if (seat.available === false) {
          //console.log("decoded", req.decoded);
          return res.status(404).json("Seat is taken!!!");
        } else {
          req.seat = seat;
          next();
        }
      })
      .catch(next);
  } else {
    next();
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const validateReservationOnChange = async (req, res, next) => {
  await check("premiere")
    .trim()
    .notEmpty()
    .withMessage("Premiere movie is required.")
    .run(req);

  await check("seat")
    .trim()
    .notEmpty()
    .withMessage("Seat is required.")
    .run(req);

  await check("firstname")
    .trim()
    .notEmpty()
    .withMessage("Firstname is required.")
    .isLength({ min: 3 })
    .withMessage("Firstname must have minimum length of 3.")
    .run(req);

  await check("lastname")
    .trim()
    .notEmpty()
    .withMessage("Lastname is required.")
    .isLength({ min: 3 })
    .withMessage("Lastname must have minimum length of 3.")
    .run(req);

  await check("reserv_date")
    .trim()
    .notEmpty()
    .withMessage("Date of reservation is required.")
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

  await check("user_type")
    .trim()
    .notEmpty()
    .withMessage("User type price is required.")
    .isIn(["copil", "minor", "adult"])
    .withMessage("Undefined user type.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  if (req.body.premiere) {
    await Premieres.findOne({ _id: req.body.premiere })
      .then((premiere) => {
        if (!premiere || premiere.active === false) {
          return res
            .status(404)
            .json(
              "The premiere of the selected movie is currently unavailable."
            );
        }
      })
      .catch(next);
  }
  if (req.body.seat) {
    const reserv = await Reservations.findOne({
      parent_user: req.decoded._id,
      seat: req.body.seat,
    }).exec();
    await Seats.findById(req.body.seat)
      .then((seat) => {
        if (seat.available === false && seat._id === reserv.seat) {
          console.log("reserv.seat", reserv.seat);
          console.log("seat._id", seat._id);
          //console.log("decoded", req.decoded);
          return res.status(404).json("Seat is taken!!!");
        } else {
          req.seat = seat;
          next();
        }
      })
      .catch(next);
  } else {
    next();
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

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

module.exports = {
  validateNewReservation,
  validateReservationOnChange,
  checkReservationExists,
};
