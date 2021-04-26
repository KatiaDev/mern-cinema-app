const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now(),
  },
  notification_type: {
    type: String,
    require: true,
  },
  users: [],
});

const notificationModel = mongoose.model("Notifications", notificationSchema);
module.exports = notificationModel;
