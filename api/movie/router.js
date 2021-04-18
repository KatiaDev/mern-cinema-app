const router = require("express").Router();
const Movies = require("./model");

router.post("/", async (req, res, next) => {
  try {
    const newMovie = await new Movies(req.body).save();
    res.status(201).json(newMovie);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
