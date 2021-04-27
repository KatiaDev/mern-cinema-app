const { check, validationResult } = require("express-validator");
const Halls = require("./model");

const validateHall = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage("Name field can't be empty.")
    .isLength({ min: 5 })
    .withMessage("Contact must have min length of 5.")
    .isAlphanumeric()
    .withMessage("Invalid name.")
    .run(req);

  await check("seats_total")
    .trim()
    .notEmpty()
    .withMessage("Seats field can't be empty.")
    .isNumeric()
    .withMessage("Invalid value type. Must be Numeric value.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

const checkHallExists = async (req, res, next) => {
  try {
    const foundHall = await Halls.findById(req.params.hall_id).exec();
    if (!foundHall) {
      return res.status(404).json({ message: "Not found." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { validateHall, checkHallExists };
