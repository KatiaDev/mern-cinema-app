const router = require("express").Router();
const Users = require("./model");
const { validateUserOnChange, checkUserExists } = require("./middleware");
const {
  registeredAccess,
  staffAccess,
  validateUserIdentity,
} = require("../auth/middleware");

router.get("/", staffAccess, async (req, res, next) => {
  Users.find()
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get(
  "/:user_id",
  registeredAccess,
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
  registeredAccess,
  validateUserIdentity,
  validateUserOnChange,
  checkUserExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (
        (req.body[curr] && curr !== "password") ||
        (req.body[curr] && curr !== "role") ||
        (req.body[curr] && curr !== "active")
      ) {
        acc[curr] = req.body[curr];
      }
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
  registeredAccess,
  validateUserIdentity,
  checkUserExists,
  async (req, res, next) => {
    Users.findByIdAndUpdate({ _id: req.params.user_id }, { active: false })
      .exec()
      .then((removedUser) => {
        res.status(200).json(removedUser);
      })
      .catch(next);
  }
);

////////////////////////////////// DELETE ALL USERS WITH active: false /////////////////////////////////////

router.delete("/", staffAccess, async (req, res, next) => {
  const users = await Users.find({ active: false });
  if (users.length === 0) {
    return res.status(404).json({ message: "No users with active: false." });
  }

  Users.deleteMany({ active: false })
    .exec()
    .then((deletedUsers) => {
      res.status(200).json(deletedUsers);
    })
    .catch(next);
});

module.exports = router;
