const { Schema, model } = require("mongoose");

const TempPassClient = new Schema(
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
    url: {
        type: String,
        required: false
    },
  },
  { timestamps: true }
);

module.exports = model("TempPassClient", TempPassClient);
