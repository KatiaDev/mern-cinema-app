const router = require("express").Router();
const Premiers = require("./model");

router.get("/", async (req, res, next) => {
  Premiers.find()
    .exec()
    .then((premier) => {
      res.status(200).json(premier);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  Premiers.findById()
    .exec()
    .then((premier) => {
      res.status(200).json(premier);
    })
    .catch(next);
});

module.exports = router;
