const { check, validationResult } = require("express-validator");
const Seats = require("./model");

const validateSeat = async (req, res, next) => {
  await check("seat_num")
    .trim()
    .notEmpty()
    .withMessage("Seat number field can't be empty.")
    .isNumeric()
    .withMessage("Invalid value type. Must be Numeric value.")
    .run(req);

  await check("row_num")
    .trim()
    .notEmpty()
    .withMessage("Row number field can't be empty.")
    .isNumeric()
    .withMessage("Invalid value type. Must be Numeric value.")
    .run(req);

  await check("seat_type")
    .notEmpty()
    .withMessage("Seat type field can't be empty.")
    .isIn(["Gold", "Standart", "Econom"])
    .withMessage("Invalid seat type.")
    .run(req);

  await check("seat_price")
    .notEmpty()
    .withMessage("Seat price field can't be empty.")
    .isDecimal()
    .withMessage("Invalid value type. Must be decimal value.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

const checkSeatExists = async (req, res, next) => {
  try {
    const foundSeat = await Seats.findById(req.params.seat_id).exec();
    if (!foundSeat) {
      return res.status(404).json({ message: "Not found." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validateSeat, checkSeatExists };
