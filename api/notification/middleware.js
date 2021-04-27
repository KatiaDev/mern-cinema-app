const { check, validationResult } = require("express-validator");
const Notifications = require("./model");
const validateNewNotification = async (req, res, next) => {
  await check("title")
    .trim()
    .notEmpty()
    .withMessage("Title for notification is required")
    .isLength({ min: 3 })
    .withMessage("Title for notification is not clear")
    .run(req);

  await check("content")
    .trim()
    .notEmpty()
    .withMessage("Content for notification is required")
    .isLength({ min: 10 })
    .withMessage("Content for notification is not clear")
    .run(req);

  await check("notification_type")
    .trim()
    .notEmpty()
    .withMessage("Notification types is required")
    .isString()
    .withMessage("Type error for notification")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }

  next();
};

const checkNotificationExists = async (req, res, next) => {
  await check("notification_id")
    .custom((notification) => {
      return Notifications.findById(notification)
        .then((notification) => {
          if (!notification) {
            return res.status(404).json("Notification is not found ");
          }
        })
        .catch(next);
    })
    .run(req);
  next();
};

module.exports = {
  validateNewNotification,
  checkNotificationExists,
};
