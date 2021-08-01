const router = require("express").Router();
const Tickets = require("./model");
const { checkTicketExists, validateNewTicket } = require("./middleware");
const { registeredAccess, staffAccess } = require("../auth/middleware");
const QRCode = require("qrcode");
const { messageSendTicket } = require("../../services/email/message");
const reservationModel = require("../reservation/model");
const Seats = require("../seat/model");
const Premieres = require("../premiere/model");
const Movies = require("../movie/model");
const Cinemas = require("../cinema/model");

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
      .populate({
        path: "reservation",
        populate: {
          path: "seats._id",
          model: Seats,
        },
      })
      .populate({
        path: "reservation",
        populate: {
          path: "premiere",
          model: Premieres,
          populate: {
            path: "movie",
            model: Movies,
          },
        },
      })
      .populate({
        path: "reservation",
        populate: {
          path: "premiere",
          model: Premieres,
          populate: {
            path: "cinema",
            model: Cinemas,
          },
        },
      })

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
      .populate({
        path: "reservation",
        populate: {
          path: "seats._id",
          model: Seats,
        },
      })
      .populate({
        path: "reservation",
        populate: {
          path: "premiere",
          model: Premieres,
          populate: {
            path: "movie",
            model: Movies,
          },
          populate: {
            path: "cinema",
            model: Cinemas,
          },
        },
      })
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
    console.log("raspunsul", req.body);
    new Tickets(req.body)
      .save()
      .then((newTicket) => {
        console.log("newTicket", newTicket);
        QRCode.toDataURL(
          `TicketID: ${newTicket._id} `,
          { errorCorrectionLevel: "H" },
          (error, qrcode) => {
            Tickets.findByIdAndUpdate(newTicket._id, { qrcode: qrcode })
              .populate({
                path: "reservation",
                populate: {
                  path: "seats._id",
                  model: Seats,
                },
              })
              .populate({
                path: "reservation",
                populate: {
                  path: "premiere",
                  model: Premieres,
                  populate: {
                    path: "movie",
                    model: Movies,
                  },
                },
              })
              .populate({
                path: "reservation",
                populate: {
                  path: "premiere",
                  model: Premieres,
                  populate: {
                    path: "cinema",
                    model: Cinemas,
                  },
                },
              })
              .exec()
              .then((ticket) => {
                console.log("result==", ticket);
                messageSendTicket(
                  req.decoded.email,
                  ticket.reservation.seats,
                  ticket.reservation.premiere,
                  ticket.reservation.premiere.movie,
                  ticket.reservation,
                  ticket.reservation.premiere.cinema,
                  qrcode
                );

                res.status(201).json(ticket);
              });
          }
        );
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
