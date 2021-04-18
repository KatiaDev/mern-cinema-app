const router = require("express").Router();
const Cinemas = require("./model");

router.get("/", async (req, res, next) => {
  Cinemas.find()
    .exec()
    .then((cinemas) => {
      res.status(200).json(cinemas);
    })
    .catch(next);
});

router.get("/:cinema_id", async (req, res, next) => {
  Cinemas.findById(req.params.cinema_id)
    .exec()
    .then((cinema) => {
      res.status(200).json(cinema);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  try {
    const cinema = await new Cinemas(req.body).save();
    res.status(201).json(cinema);
  } catch (err) {
    next(err);
  }
});

router.put("/:cinema_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    if (req.body[curr]) {
      acc[curr] = req.body[curr];
    }
    return acc;
  }, {});
  try {
    const updatedCinema = await Cinemas.findByIdAndUpdate(
      req.params.cinema_id,
      bodyReducer
    ).exec();
    res.status(200).json(updatedCinema);
  } catch (err) {
    next(err);
  }
});

router.delete("/:cinema_id", async (req, res, next) => {
  try {
    const deletedCinema = await Cinemas.findByIdAndDelete(
      req.params.cinema_id
    ).exec();
    res.status(200).json(deletedCinema);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
