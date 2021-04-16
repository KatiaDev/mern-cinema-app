const router = require("express").Router();
const Users = require("./model");

router.get("/", async (req, res, next) => {
  Users.find()
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  Users.findById()
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

module.exports = router;
