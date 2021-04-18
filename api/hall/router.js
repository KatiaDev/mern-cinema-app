const router = require("express").Router();
const Halls = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const halls = await Halls.find().exec();
    res.status(200).json(halls);
  } catch (err) {
    next(err);
  }
});

router.get("/:hall_id", async (req, res, next) => {
  try {
    const foundHall = await Halls.findById(req.params.hall_id).exec();
    res.status(200).json(foundHall);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newHall = await new Halls(req.body).save();
    res.status(201).json(newHall);
  } catch (err) {
    next(err);
  }
});

router.put("/:hall_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    if (req.body[curr] && curr !== "cinema") {
      acc[curr] = req.body[curr];
    }
    return acc;
  }, {});
  try {
    const updatedHall = await Halls.findOneAndUpdate(
      req.params.hall_id,
      bodyReducer
    ).exec();
    res.status(200).json(updatedHall);
  } catch (err) {
    next(err);
  }
});

router.delete("/:hall_id", async (req, res, next) => {
  try {
    const deletedHall = await Halls.findByIdAndDelete(
      req.params.hall_id
    ).exec();
    res.status(200).json(deletedHall);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
