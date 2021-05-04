const router = require("express").Router();
const Cinemas = require("./model");
const Halls = require("../hall/model");
const { validateCinema, checkCinemaExists } = require("./middleware");
const { registeredAcces, staffAcces } = require("../auth/middleware");

router.get("/", async (req, res, next) => {
  Cinemas.find()
    .exec()
    .then((cinemas) => {
      res.status(200).json(cinemas);
    })
    .catch(next);
});

router.get("/:cinema_id", checkCinemaExists, async (req, res, next) => {
  Cinemas.findById(req.params.cinema_id)
    .exec()
    .then((cinema) => {
      res.status(200).json(cinema);
    })
    .catch(next);
});

router.post(
  "/",
  validateCinema,
  registeredAcces,
  staffAcces,
  async (req, res, next) => {
    try {
      const foundCinema = await Cinemas.findOne({ name: req.body.name }).exec();
      if (foundCinema) {
        return res.status(400).json({ message: "Name is already in use." });
      }
      const cinema = await new Cinemas(req.body).save();
      res.status(201).json(cinema);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:cinema_id",
  validateCinema,
  checkCinemaExists,
  registeredAcces,
  staffAcces,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr]) {
        acc[curr] = req.body[curr];
      }
      return acc;
    }, {});
    try {
      const updatedCinema = await Cinemas.findOneAndUpdate(
        {
          _id: req.params.cinema_id,
        },
        bodyReducer
      ).exec();
      res.status(200).json(updatedCinema);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:cinema_id",
  checkCinemaExists,
  registeredAcces,
  staffAcces,
  async (req, res, next) => {
    try {
      const deletedCinema = await Cinemas.findByIdAndDelete(
        req.params.cinema_id
      ).exec();
      res.status(200).json(deletedCinema);
    } catch (err) {
      next(err);
    }
  }
);

// GET ALL CINEMA HALLS

router.get(
  "/:cinema_id/halls",
  checkCinemaExists,
  registeredAcces,
  staffAcces,
  async (req, res, next) => {
    try {
      const halls = await Halls.find({ cinema: req.params.cinema_id }).exec();
      res.status(200).json(halls);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
