const express = require("express");

const Movie = require("./model");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newMovie = await new Movie(req.body).save();
    res.status(201).json(newMovie);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
