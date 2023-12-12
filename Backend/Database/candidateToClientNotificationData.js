const { Schema, model } = require("mongoose");

const candidateToClientNotificationSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    receiverName: {
        type: String,
        required: true,
    },
    type: {
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
  },
  { timestamps: true }
);

module.exports = model("candidateToClientNotification", candidateToClientNotificationSchema);
