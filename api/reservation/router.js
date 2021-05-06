const router = require("express").Router();
const Reservations = require("./model");
const {
  checkReservationExists,
  validateNewReservation,
} = require("./middleware");
const {
  registeredAccess,
  staffAccess,
  validateUserIdentity,
} = require("../auth/middleware");

router.get("/", staffAccess, async (req, res, next) => {
  Reservations.find()
    .exec()
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch(next);
});

router.get(
  "/:reservation_id",
  staffAccess,
  checkReservationExists,
  async (req, res, next) => {
    console.log("A intrat in reservation_id");
    Reservations.findById(req.params.reservation_id)
      .exec()
      .then((reservation) => {
        res.status(200).json(reservation);
      })
      .catch(next);
  }
);
router.get(
  "/:user_id/reservations",
  registeredAccess,
  validateUserIdentity,
  async (req, res, next) => {
    Reservations.find({ parent_user: req.params.user_id })
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
      .exec()
      .then((reservation) => {
        res.status(200).json(reservation);
      })
      .catch(next);
  }
);

router.post(
  "/",
  registeredAccess,
  validateNewReservation,
  async (req, res, next) => {
    new Reservations(req.body)
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
  validateNewReservation,
  checkReservationExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (
        (req.body[curr] && curr !== "premiere") ||
        (req.body[curr] && curr !== "parent_user") ||
        (req.body[curr] && curr !== "seat")
      ) {
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
    Reservations.findByIdAndDelete(req.params.reservation_id)
      .exec()
      .then((deletedReservation) => {
        res.status(200).json(deletedReservation);
      })
      .catch(next);
  }
);

module.exports = router;
