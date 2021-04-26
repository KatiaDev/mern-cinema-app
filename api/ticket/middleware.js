const { check, validationResult } = require("express-validator");
const Tickets = require("./model");

const validateNewTicket = async (req, res, next) => {
  await check("qrcode")
    .trim()
    .notEmpty()
    .withMessage(" QR - Code is required")
    .isLength({ min: 10 })
    .withMessage(" QR - Code is corrupt")
    .run(req);

  await check("pay_type")
    .trim()
    .notEmpty()
    .withMessage(" Pay type is required ")
    .isLength({ min: 3 })
    .withMessage(" Undefined pay type")
    .run(req);

  await check("pay_date")
    .trim()
    .notEmpty()
    .withMessage("Payment date is required")
    .isISO8601()
    .withMessage("Undefined date format")
    .toDate()
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }

  next();
};

const checkTicketExists = async (req, res, next) => {
  await check("ticket_id")
    .trim()
    .notEmpty()
    .withMessage("Ticket is required")
    .custom((ticket) => {
      return Tickets.findById(ticket)
        .then((ticket) => {
          if (!ticket) {
            throw " Ticket is not found ";
          }
        })
        .catch(next);
    })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }
  next();
};

module.exports = {
  validateNewTicket,
  checkTicketExists,
};
