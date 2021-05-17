const router = require("express").Router();
const Reservations = require("./model");
const Seats = require("../seat/model");
const {
  checkReservationExists,
  validateNewReservation,
  validateReservationOnChange,
  checkPermiereExists,
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
  "/:reservation_id",
  staffAccess,
  checkReservationExists,
  async (req, res, next) => {
    console.log("A intrat in reservation_id");
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
  "/:user_id/reservations",
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
        res.status(200).json(reservation);
      })
      .catch(next);
  }
);

router.post(
  "/",
  //registeredAccess,
  // validateNewReservation,
  checkPermiereExists,
  async (req, res, next) => {
    //   new Reservations({ parent_id: req.decoded._id, ...req.body })
    //     .save()
    //     .then((newReservation) => {
    //       res.status(201).json(newReservation);
    //     })
    //     .catch(next);
    //   Seats.findByIdAndUpdate({ _id: req.body.seat }, { available: false })
    //     .exec()
    //     .then((updatedSeat) => {
    //       console.log("before change -> available: ", updatedSeat.available);
    //     })
    //     .catch(next);
  }
);

router.put(
  "/:reservation_id",
  registeredAccess,
  validateReservationOnChange,
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
    Seats.findByIdAndUpdate({ _id: req.body.seat }, { available: false })
      .exec()
      .then((updatedSeat) => {
        console.log("before change -> available: ", updatedSeat.available);
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
