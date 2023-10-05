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
    role: {
      type: String,
      required: true
    },
    tempPassword: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("forgotPasswordUser", forgotPasswordUserSchema);
