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

router.get("/:ticket_id", async (req, res, next) => {
  Tickets.findById()
    .exec()
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch(next);
});

router.put("/:ticket_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    if (
      (req.body[curr] && curr !== "premier") ||
      (req.body[curr] && curr !== "user") ||
      (req.body[curr] && curr !== "seat")
    ) {
      acc[curr] = req.body[curr];
    }
    return acc;
  }, {});

  Tickets.findByIdAndUpdate(req.params.ticket_id, bodyReducer)
    .exec()
    .then((updatedTicket) => {
      res.status(200).json(updatedTicket);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  new Tickets(req.body)
    .save()
    .then((newTicket) => {
      res.status(200).json(newTicket);
    })
    .catch(next);
});


router.delete("/:ticket_id", async (req, res, next) => {
  Tickets.findByIdAndDelete(req.params.ticket_id).exec();
  res.status(200).json(deletedTicket).catch(next);
});



module.exports = router;
