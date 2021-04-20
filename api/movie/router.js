const router = require("express").Router();
const Movies = require("./model");

router.get("/", async (req, res, next) => {
  Movies.find()
    .exec()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch(next);
});

router.get("/:movie_id", async (req, res, next) => {
  Movies.findById()
    .exec()
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch(next);
});

router.put("/:movie_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    acc[curr] = req.body[curr];
    return acc;
  }, {});
  Movies.findByIdAndUpdate(req.params.movie_id, bodyReducer)
    .exec()
    .then(() => {
      res.status(200).json(updatedMovie);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  new Movies(req.body)
    .save()
    .then((newMovie) => {
      res.status(201).json(newMovie);
    })
    .catch(next);
});

router.delete("/:movie_id", async (req, res, next) => {
  Movies.findByIdAndDelete(req.params.movie_id, { activ: false })
    .exec()
    .then((removeMovie) => {
      res.status(200).json(removeMovie);
    })
    .catch(next);
});

module.exports = router;
