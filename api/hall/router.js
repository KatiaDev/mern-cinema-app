const router = require("express").Router();
const Halls = require("./model");
const Seats = require("../seat/model");
const { validateHall, checkHallExists } = require("./middleware");
const { registeredAccess, staffAccess } = require("../auth/middleware");

router.get("/", staffAccess, async (req, res, next) => {
  try {
    const halls = await Halls.find().populate("cinema", "name").exec();
    res.status(200).json(halls);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:hall_id",
  registeredAccess,
  checkHallExists,
  async (req, res, next) => {
    try {
      const foundHall = await Halls.findById(req.params.hall_id)
        .populate("cinema", "name")
        .exec();
      res.status(200).json(foundHall);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", staffAccess, validateHall, async (req, res, next) => {
  try {
    const newHall = await new Halls(req.body).save();
    res.status(201).json(newHall);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:hall_id",
  staffAccess,
  validateHall,
  checkHallExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr] && curr !== "cinema") {
        acc[curr] = req.body[curr];
      }
      return acc;
    }, {});
    try {
      const updatedHall = await Halls.findByIdAndUpdate(
        req.params.hall_id,
        bodyReducer
      ).exec();
      res.status(200).json(updatedHall);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:hall_id",
  staffAccess,
  checkHallExists,
  async (req, res, next) => {
    try {
      const deletedHall = await Halls.findByIdAndDelete(
        req.params.hall_id
      ).exec();
      res.status(200).json(deletedHall);
    } catch (err) {
      next(err);
    }
  }
);

// GET ALL HALL SEATS

router.get(
  "/:hall_id/seats",
  registeredAccess,
  checkHallExists,
  async (req, res, next) => {
    try {
      const seats = await Seats.find({ hall: req.params.hall_id })
        .populate("hall", "name")
        .exec();
      res.status(200).json(seats);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
