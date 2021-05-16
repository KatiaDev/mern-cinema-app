const { check, validationResult } = require("express-validator");
const Tickets = require("./model");

const validateNewTicket = async (req, res, next) => {
  await check("qrcode")
    .trim()
    .notEmpty()
    .withMessage(" QR - Code is required.")
    .isLength({ min: 24 })
    .withMessage(" QR - Code is corrupt.")
    .run(req);

  await check("pay_type")
    .trim()
    .notEmpty()
    .withMessage(" Pay type is required. ")
    .isLength({ min: 4 })
    .isIn(["cash", "card", "bitcoin"])
    .withMessage(" Undefined pay type.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

const checkTicketExists = async (req, res, next) => {
  Tickets.findById(req.params.ticket_id)
    .then((ticket) => {
      if (!ticket) {
        return res.status(404).json(" Ticket is not found ");
      }
      next();
    })
    .catch(next);
};

module.exports = {
  validateNewTicket,
  checkTicketExists,
};
