const router = require("express").Router();
const Users = require("./model");
const { validateNewUser, checkUserExists } = require("./middleware");
const { registeredAcces, staffAcces } = require("../auth/middleware");

router.get("/", registeredAcces, staffAcces, async (req, res, next) => {
  Users.find()
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.get(
  "/:user_id",
  registeredAcces,
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
  checkUserExists,
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
