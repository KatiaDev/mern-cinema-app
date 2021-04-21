const router = require("express").Router();
const Notifications = require("./model");

router.get("/", async (req, res, next) => {
    Notifications.find()
    .exec()
    .then((notification) => {
      res.status(200).json(notification);
    })
    .catch(next);
});

router.get("/:notification_id", async (req, res, next) => {
    Notifications.findById()
    .exec()
    .then((notification) => {
      res.status(200).json(notification);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  new Notifications(req.body)
    .save()
    .then((newNotification) => {
      res.status(200).json(newNotification);
    })
    .catch(next);
});

router.put("/:notification_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    if (
      (req.body[curr] && curr !== "movie") ||
      (req.body[curr] && curr !== "cinema")
    ) {
      acc[curr] = req.body[curr];
    }
    return acc;
  }, {});

  Notifications.findByIdAndUpdate(req.params.premiere_id, bodyReducer)
    .exec()
    .then((updatedNoitification) => {
      res.status(200).json(updatedNoitification);
    })
    .catch(next);
});

router.delete("/:notification_id", async (req, res, next) => {
    Notifications.findByIdAndDelete(req.params.premiere_id).exec();
  res.status(200).json(deletedNotification).catch(next);
});

module.exports = router;
