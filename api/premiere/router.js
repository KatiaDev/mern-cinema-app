const router = require("express").Router();
const Premieres = require("./model");

router.get("/", async (req, res, next) => {
  Premieres.find()
    .exec()
    .then((premieres) => {
      res.status(200).json(premieres);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  Premieres.findById()
    .exec()
    .then((premiere) => {
      res.status(200).json(premiere);
    })
    .catch(next);
});

module.exports = router;
