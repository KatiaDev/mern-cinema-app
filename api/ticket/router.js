const router = require("express").Router();
const Tickets = require("./model");
const { checkTicketExists, validateNewTicket } = require("./middleware");
const { registeredAcces, staffAcces } = require("../auth/middleware");

router.get("/", registeredAcces, staffAcces, async (req, res, next) => {
  Tickets.find()
    .exec()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(next);
});

router.get(
  "/:ticket_id",
  registeredAcces,
  staffAcces,
  checkTicketExists,
  async (req, res, next) => {
    Tickets.findById(req.params.ticket_id)
      .exec()
      .then((ticket) => {
        res.status(200).json(ticket);
      })
      .catch(next);
  }
);

router.put(
  "/:ticket_id",
  registeredAcces,
  staffAcces,
  validateNewTicket,
  checkTicketExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr] && curr !== "reservation") {
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
  }
);

router.post("/", registeredAcces, validateNewTicket, async (req, res, next) => {
  new Tickets(req.body)
    .save()
    .then((newTicket) => {
      res.status(201).json(newTicket);
    })
    .catch(next);
});

router.delete(
  "/:ticket_id",
  registeredAcces,
  staffAcces,
  checkTicketExists,
  async (req, res, next) => {
    Tickets.findByIdAndDelete(req.params.ticket_id)
      .exec()
      .then((deletedTicket) => {
        res.status(200).json(deletedTicket);
      })
      .catch(next);
  }
);

module.exports = router;
