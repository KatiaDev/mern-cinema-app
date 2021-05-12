const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    notification_type: {
      type: String,
      require: true,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },

  {
    timestamps: true,
  }
);

const notificationModel = mongoose.model("Notifications", notificationSchema);
module.exports = notificationModel;
