const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({ message: "Something went wrong, please try again." });
};

module.exports = errorMiddleware;
