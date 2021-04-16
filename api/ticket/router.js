const router = require("express").Router();
const Tickets = require("./model");

router.get("/", async (req, res, next) => {
  Tickets.find()
    .exec()
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  Tickets.findById()
    .exec()
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(next);
});

module.exports = router;
