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

router.get("/:user_id", async (req, res, next) => {
  Users.findById()
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.put("/:user_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    acc[curr] = req.body[curr];
    return acc;
  }, {});
  Users.findByIdAndUpdate(req.params.user_id, bodyReducer)
    .exec()
    .then(() => {
      res.status(200).json(updatedUser);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  new Users(req.body)
    .save()
    .then((newUser) => {
      res.status(200).json(newUser);
    })
    .catch(next);
});

router.delete("/:user_id", async (req, res, next) => {
  Users.findByIdAndDelete(req.params.user_id, { activ: false })
    .exec()
    .then((removeUser) => {
      res.status(200).json(removeUser);
    })
    .catch(next);
});

module.exports = router;
