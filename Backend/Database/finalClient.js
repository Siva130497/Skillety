const { Schema, model } = require("mongoose");

const finalClient = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    count: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
  },
  },
  { timestamps: true }
);

module.exports = model("FinalClient", finalClient);
