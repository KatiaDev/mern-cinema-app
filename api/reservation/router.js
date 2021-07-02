const router = require("express").Router();
const Reservations = require("./model");
const Seats = require("../seat/model");
const {
  checkReservationExists,
  validateNewReservation,
  checkSeatIsAvailable,
} = require("./middleware");
const {
  registeredAccess,
  staffAccess,
  validateUserIdentity,
} = require("../auth/middleware");

router.get("/", staffAccess, async (req, res, next) => {
  Reservations.find()
    .populate("premiere", "-active")
    .populate("seat")
    .exec()
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch(next);
});

router.get(
  "/:premiere_id/:cinema_id/:hall_id",
  registeredAccess,
  async (req, res, next) => {
    console.log("A intrat in reservation QUERY  = ", req.query);
    console.log("A intrat in reservation PARAMS  = ", req.params);

    Reservations.findOne({
      premiere: req.params.premiere_id,
      reserv_date: req.query.date,
      reserv_hour: req.query.hour,
    })
      .populate({ path: "premiere", match: { cinema: req.params.cinema_id } })

      .populate({ path: "seats", match: { hall: req.params.hall_id } })

      .exec()
      .then((reservations) => {
        if (reservations) {
          res.status(200).json(reservations);
        }
        res.status(404).json("Not found");
      })
      .catch(next);
  }
);

router.get(
  "/:reservation_id",
  staffAccess,
  checkReservationExists,
  async (req, res, next) => {
    Reservations.findById(req.params.reservation_id)
      .populate("premiere", "-active")
      .populate("seat")
      .exec()
      .then((reservation) => {
        res.status(200).json(reservation);
      })
      .catch(next);
  }
);
router.get(
  "/:user_id",
  registeredAccess,
  validateUserIdentity,
  async (req, res, next) => {
    Reservations.find({ parent_user: req.params.user_id })
      .populate("premiere", "-active")
      .populate("seat")
      .exec()
      .then((reservations) => {
        res.status(200).json(reservations);
      })
      .catch(next);
  }
);

router.get(
  "/:user_id/:reservation_id",
  registeredAccess,
  validateUserIdentity,
  checkReservationExists,
  async (req, res, next) => {
    Reservations.findOne({
      parent_user: req.params.user_id,
      _id: req.params.reservation_id,
    })
      .populate("premiere", "-active")
      .populate("seat")
      .exec()
      .then((reservation) => {
        if (reservation) {
          res.status(200).json(reservation);
        }
        return res.status(404).json("Not found.");
      })
      .catch(next);
  }
);

router.post(
  "/",
  registeredAccess,
  validateNewReservation,
  checkSeatIsAvailable,
  async (req, res, next) => {
    new Reservations({ parent_user: req.decoded._id, ...req.body })
      .save()
      .then((newReservation) => {
        res.status(201).json(newReservation);
      })
      .catch(next);
  }
);

router.put(
  "/:reservation_id",
  registeredAccess,
  checkReservationExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr] && curr !== "parent_user") {
        acc[curr] = req.body[curr];
      }
      return acc;
    }, {});

    Reservations.findByIdAndUpdate(req.params.reservation_id, bodyReducer)
      .exec()
      .then((updatedReservation) => {
        res.status(200).json(updatedReservation);
      })
      .catch(next);
  }
);

router.delete(
  "/:reservation_id",
  registeredAccess,
  checkReservationExists,
  async (req, res, next) => {
    const reserv = await Reservations.findById(
      req.params.reservation_id
    ).exec();
    const updatedSeat = await Seats.findByIdAndUpdate(
      { _id: reserv.seat },
      { available: true }
    ).exec();
    console.log("updated seat after reserv deletion: ", updatedSeat.available);
    Reservations.findByIdAndDelete(req.params.reservation_id)
      .exec()
      .then((deletedReservation) => {
        res.status(200).json(deletedReservation);
      })
      .catch(next);
  }
);

module.exports = router;
