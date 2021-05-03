const router = require("express").Router();
const Premieres = require("./model");
const { checkPremiereExists, validateNewPremiere } = require("./middleware");
const { registeredAcces, staffAcces } = require("../auth/middleware");

router.get("/", async (req, res, next) => {
  Premieres.find()
    .exec()
    .then((premieres) => {
      res.status(200).json(premieres);
    })
    .catch(next);
});

router.get("/:premiere_id", checkPremiereExists, async (req, res, next) => {
  Premieres.findById(req.params.premiere_id)
    .exec()
    .then((premiere) => {
      res.status(200).json(premiere);
    })
    .catch(next);
});

router.post(
  "/",
  validateNewPremiere,
  registeredAcces,
  staffAcces,
  async (req, res, next) => {
    new Premieres(req.body)
      .save()
      .then((newPremier) => {
        res.status(200).json(newPremier);
      })
      .catch(next);
  }
);

router.put(
  "/:premiere_id",
  checkPremiereExists,
  validateNewPremiere,
  registeredAcces,
  staffAcces,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (
        (req.body[curr] && curr !== "movie") ||
        (req.body[curr] && curr !== "cinema")
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
  }
);

router.delete(
  "/:premiere_id",
  checkPremiereExists,
  registeredAcces,
  staffAcces,
  async (req, res, next) => {
    Premieres.findOneAndUpdate({
      _id: req.params.premiere_id,
      active: false,
    })
      .exec()
      .then((deletedPremiere) => {
        res.status(200).json(deletedPremiere);
      })
      .catch(next);
  }
);

module.exports = router;
