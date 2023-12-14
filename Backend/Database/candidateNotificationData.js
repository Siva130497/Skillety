const { Schema, model } = require("mongoose");

const candidateNotificationSchema = new Schema(
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
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          return typeof value === "string" || Array.isArray(value);
        },
        message: "receiverName must be a string or an array.",
      },
      required: true,
    },
    receiverName: {
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          return typeof value === "string" || Array.isArray(value);
        },
        message: "receiverName must be a string or an array.",
      },
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

module.exports = model("candidatetNotification", candidateNotificationSchema);
