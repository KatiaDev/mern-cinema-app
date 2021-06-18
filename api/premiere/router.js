const router = require("express").Router();
const Premieres = require("./model");
const { checkPremiereExists, validateNewPremiere } = require("./middleware");
const { staffAccess } = require("../auth/middleware");

router.get("/", async (req, res, next) => {
  Premieres.find()
    .populate(
      "movie",
      "title genre rating description actors duration image_url video_url -_id"
    )
    .populate("cinema", "name -_id")
    .populate(
      "movie",
      "title original_title genre director release_date rating description actors duration age_restrict image_url video_url -_id"
    )
    .exec()
    .then((premieres) => {
      res.status(200).json(premieres);
    })
    .catch(next);
});

router.get("/:premiere_id", checkPremiereExists, async (req, res, next) => {
  Premieres.findOne({ _id: req.params.premiere_id })
    .populate("cinema", "name -_id")
    .populate(
      "movie",
      "title original_title genre director release_date rating description actors duration age_restrict image_url video_url -_id"
    )
    .exec()
    .then((premiere) => {
      res.status(200).json(premiere);
    })
    .catch(next);
});

router.post("/", staffAccess, validateNewPremiere, async (req, res, next) => {
  new Premieres(req.body)
    .save()
    .then((newPremiere) => {
      res.status(201).json(newPremiere);
    })
    .catch(next);
});

router.put(
  "/:premiere_id",
  staffAccess,
  validateNewPremiere,
  checkPremiereExists,
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
      .then((updatedPremiere) => {
        res.status(200).json(updatedPremiere);
      })
      .catch(next);
  }
);

router.delete(
  "/:premiere_id",
  staffAccess,
  checkPremiereExists,
  async (req, res, next) => {
    Premieres.findByIdAndUpdate(
      { _id: req.params.premiere_id },
      { active: false }
    )
      .exec()
      .then((deletedPremiere) => {
        res.status(200).json(deletedPremiere);
      })
      .catch(next);
  }
);

module.exports = router;
