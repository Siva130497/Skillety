const { Schema, model } = require("mongoose");

const clientChatSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = model("clientChat", clientChatSchema);
