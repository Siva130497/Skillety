const { Schema, model } = require("mongoose");

const forgotPasswordUserSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    verificationCode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("forgotPasswordUser", forgotPasswordUserSchema);
