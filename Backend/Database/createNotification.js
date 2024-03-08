const { Schema, model } = require("mongoose");

const createNotificationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    receiverId: {
      type: Array,
      required: true,
    },
    receiverName: {
      type: Array,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    redirect: {
      type: String,
      required: true,
    },
    readStatus: {
        type: Boolean,
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = model("createNotification", createNotificationSchema);
