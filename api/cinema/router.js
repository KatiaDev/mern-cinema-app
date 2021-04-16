const router = require("express").Router();
const Cinema = require("./model");

router.get("/", async (req, res, next) => {
  Cinema.find()
    .exec()
    .then((cinemas) => {
      res.status(200).json(cinemas);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  Cinema.findById()
    .exec()
    .then((cinema) => {
      res.status(200).json(cinema);
    })
    .catch(next);
});

module.exports = router;
