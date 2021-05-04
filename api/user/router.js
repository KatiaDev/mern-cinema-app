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
    .then((user) => {
      res.status(200).json(user);
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
  validateNewUser,
  checkUserExists,
  validateUserIdentity,
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

<<<<<<< HEAD
router.post("/", middleware.validateNewUser, async (req, res, next) => {
  new Users(req.body)
    .save()
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

=======
>>>>>>> 4f86a2cde27d34b8161d0f4a47dbf9e487c5025e
router.delete(
  "/:user_id",
  registeredAcces,
  checkUserExists,
  validateUserIdentity,
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
