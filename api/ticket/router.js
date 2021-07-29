const router = require("express").Router();
const Tickets = require("./model");
const { checkTicketExists, validateNewTicket } = require("./middleware");
const { registeredAccess, staffAccess } = require("../auth/middleware");
const QRCode = require("qrcode");
router.get("/", staffAccess, async (req, res, next) => {
  Tickets.find()
    .exec()
    .then((tickets) => {
      res.status(200).json(tickets);
    })
    .catch(next);
});

router.get(
  "/:ticket_id",
  registeredAccess,
  checkTicketExists,
  async (req, res, next) => {
    Tickets.findById(req.params.ticket_id)
      .populate("reservation")
      .exec()
      .then((ticket) => {
        res.status(200).json(ticket);
      })
      .catch(next);
  }
);

router.put(
  "/:ticket_id",
  staffAccess,
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

router.post(
  "/",
  registeredAccess,
  validateNewTicket,
  async (req, res, next) => {
    QRCode.toDataURL("Welcome to Olymp Cinema", (err, url) => {
      console.log(url);
    });

    new Tickets(req.body)
      .save()
      .then((newTicket) => {
        res.status(201).json(newTicket);
      })
      .catch(next);
  }
);

router.delete(
  "/:ticket_id",
  staffAccess,
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
