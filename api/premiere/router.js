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

router.get("/:premiere_id", async (req, res, next) => {
  Premieres.findById()
    .exec()
    .then((premiere) => {
      res.status(200).json(premiere);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  new Premieres(req.body)
    .save()
    .then((newPremier) => {
      res.status(200).json(newPremier);
    })
    .catch(next);
});

router.put("/:premiere_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    if (
      (req.body[curr] && curr !== "movies") ||
      (req.body[curr] && curr !== "cinemas")
    ) {
      acc[curr] = req.body[curr];
    }
    return acc;
  }, {});

  Premieres.findByIdAndUpdate(req.params.premiere_id, bodyReducer)
    .exec()
    .then((updatedPremier) => {
      res.status(200).json(updatedPremier);
    })
    .catch(next);
});

router.delete("/:premiere_id", async (req, res, next) => {
  Premieres.findByIdAndDelete(req.params.premiere_id).exec();
  res.status(200).json(deletedPremiere).catch(next);
});

module.exports = router;
