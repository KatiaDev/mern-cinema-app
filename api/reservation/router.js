const router = require("express").Router();
const Reservations = require("./model");

router.get("/", async (req, res, next) => {
  Reservations.find()
    .exec()
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch(next);
});

router.get("/:reservation_id", async (req, res, next) => {
  Reservations.findById()
    .exec()
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  new Reservations(req.body)
    .save()
    .then((newReservation) => {
      res.status(200).json(newReservation);
    })
    .catch(next);
});

router.put("/:reservation_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    if (
      (req.body[curr] && curr !== "premieres") ||
      (req.body[curr] && curr !== "users") ||
      (req.body[curr] && curr !== "seats")
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
});

router.delete("/:reservation_id", async (req, res, next) => {
  Reservations.findByIdAndDelete(req.params.reservation_id).exec();
  res.status(200).json(deletedReservation).catch(next);
});

module.exports = router;
