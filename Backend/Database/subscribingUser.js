const { Schema, model } = require("mongoose");

const subscribingUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    subcribtionDate: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = model("SubscribingUser", subscribingUserSchema);
