const { Schema, model } = require("mongoose");

const roomIdChatDetailSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userId: {
        type: String,
        required: true,
      },
    message: {
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
  }
  },
  { timestamps: true }
);

module.exports = model("roomIdChatDetail", roomIdChatDetailSchema);
