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

module.exports = router;
