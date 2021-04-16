const router = require("express").Router();
const Cinematografphs = require("./model");

router.get("/", async (req, res, next) => {
  Cinematografphs.find()
    .exec()
    .then((ticket) => {
      res.status(200).json(cinematograf);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  Cinematografphs.findById()
    .exec()
    .then((ticket) => {
      res.status(200).json(cinematograf);
    })
    .catch(next);
});

module.exports = router;
