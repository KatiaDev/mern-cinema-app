const router = require("express").Router();
const Users = require("./model");
const middleware = require("./middleware");

router.get("/", async (req, res, next) => {
  Users.find()
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.get("/:user_id", middleware.checkUserExists, async (req, res, next) => {
  Users.findById(req.params.user_id)
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.put(
  "/:user_id",
  middleware.validateNewUser,
  middleware.checkUserExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      acc[curr] = req.body[curr];
      return acc;
    }, {});
    Users.findByIdAndUpdate(req.params.user_id, bodyReducer)
      .exec()
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch(next);
  }
);

router.post("/", middleware.validateNewUser, async (req, res, next) => {
  new Users(req.body)
    .save()
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.delete(
  "/:user_id",
  middleware.checkUserExists,
  async (req, res, next) => {
    Users.findOneAndUpdate({ _id: req.params.user_id, active: false })
      .exec()
      .then((removeUser) => {
        res.status(200).json(removeUser);
      })
      .catch(next);
  }
);

module.exports = router;
