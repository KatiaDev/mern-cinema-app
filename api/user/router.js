const router = require("express").Router();
const Users = require("./model");
const { validateNewUser, checkUserExists } = require("./middleware");
const {
  registeredAcces,
  staffAcces,
  validateUserIdentity,
} = require("../auth/middleware");

router.get("/", registeredAcces, staffAcces, async (req, res, next) => {
  Users.find()
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get(
  "/:user_id",
  registeredAcces,
  validateUserIdentity,
  checkUserExists,
  async (req, res, next) => {
    Users.findById(req.params.user_id)
      .exec()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
);

router.put(
  "/:user_id",
  registeredAcces,
  validateUserIdentity,
  validateNewUser,
  checkUserExists,
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

router.delete(
  "/:user_id",
  registeredAcces,
  validateUserIdentity,
  checkUserExists,
  async (req, res, next) => {
    Users.findOneAndUpdate({ _id: req.params.user_id, active: false })
      .exec()
      .then((removedUser) => {
        res.status(200).json(removedUser);
      })
      .catch(next);
  }
);

module.exports = router;
