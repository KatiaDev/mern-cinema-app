const router = require("express").Router();
const Notifications = require("./model");
const {
  checkNotificationExists,
  validateNewNotification,
} = require("./middleware");
const {
  registeredAccess,
  staffAccess,
  validateUserIdentity,
} = require("../auth/middleware");
const { checkUserExists } = require("../user/middleware");
const { notificationSendEmail } = require("../../services/email/message");

router.get("/", staffAccess, async (req, res, next) => {
  Notifications.find()
    .exec()
    .then((notifications) => {
      res.status(200).json(notifications);
    })
    .catch(next);
});

router.get(
  "/:notification_id",
  registeredAccess,
  checkNotificationExists,
  async (req, res, next) => {
    Notifications.findById(req.params.notification_id)
      .exec()
      .then((notification) => {
        res.status(200).json(notification);
      })
      .catch(next);
  }
);

router.get(
  "/:user_id/notifications",
  registeredAccess,
  validateUserIdentity,
  checkUserExists,
  async (req, res, next) => {
    await Notifications.find({
      users: req.params.user_id,
    })
      .then((notifications) => {
        return res.status(200).json(notifications);
      })
      .catch(next);
  }
);

router.post(
  "/",
  staffAccess,
  validateNewNotification,
  async (req, res, next) => {
    new Notifications(req.body)
      .save()
      .then((newNotification) => {
        newNotification
          .populate("users", "email -_id")
          .execPopulate((error, notification) => {
            notification.users.forEach((user) => {
              notificationSendEmail(
                user.email,
                notification.title,
                notification.content
              );
            });
          });
        res.status(201).json(newNotification);
      })
      .catch(next);
  }
);

router.put(
  "/:notification_id",
  staffAccess,
  validateNewNotification,
  checkNotificationExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      acc[curr] = req.body[curr];
      return acc;
    }, {});

    Notifications.findByIdAndUpdate(req.params.notification_id, bodyReducer)
      .exec()
      .then((updatedNotification) => {
        res.status(200).json(updatedNotification);
      })
      .catch(next);
  }
);

router.delete(
  "/:notification_id",
  registeredAccess,
  checkNotificationExists,
  async (req, res, next) => {
    Notifications.findByIdAndDelete(req.params.notification_id)
      .exec()
      .then((deletedNotification) => {
        res.status(200).json(deletedNotification);
      })
      .catch(next);
  }
);

module.exports = router;
