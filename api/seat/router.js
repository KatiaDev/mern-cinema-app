const router = require("express").Router();
const Seats = require("./model");
const { validateSeat, checkSeatExists } = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const seats = await Seats.find().exec();
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
});

router.get("/:seat_id", checkSeatExists, (req, res, next) => {
  res.status(200).json(foundSeat);
});

router.post("/", validateSeat, async (req, res, next) => {
  try {
    const newSeat = await new Seats(req.body).save();
    res.status(201).json(newSeat);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:seat_id",
  validateSeat,
  checkSeatExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr] && curr !== "hall") {
        acc[curr] = req.body[curr];
      }
      return acc;
    }, {});
    try {
      const updatedSeat = await Seats.findByIdAndUpdate(
        req.params.seat_id,
        bodyReducer
      ).exec();
      res.status(200).json(updatedSeat);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:seat_id", checkSeatExists, async (req, res, next) => {
  try {
    const deletedSeat = await Seats.findByIdAndDelete(
      req.params.seat_id
    ).exec();
    res.status(200).json(deletedSeat);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
