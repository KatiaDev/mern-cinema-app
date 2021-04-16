const router = require("express").Router();
const Cinema = require("./model");

router.get("/", async (req, res, next) => {
  Cinema.find()
    .exec()
    .then((ticket) => {
      res.status(200).json();
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  Cinema.findById()
    .exec()
    .then((ticket) => {
      res.status(200).json();
    })
    .catch(next);
});

module.exports = router;
