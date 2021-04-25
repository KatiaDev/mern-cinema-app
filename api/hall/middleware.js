const Halls = require("./model");

const validateHall = (req, res, next) => {
  const { cinema, name, seats_total } = req.body;

  if (!cinema || !name || !seats_total) {
    return res.status(400).json({ message: "Missing required field." });
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
