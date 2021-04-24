const Seats = require("./model");

const validateSeat = (req, res, next) => {
  const { hall, seat_num, row_num, seat_type, seat_status } = req.body;

  if (!hall || !seat_num || !row_num || !seat_type || !seat_status) {
    return res.status(400).json({ message: "Missing required field." });
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
