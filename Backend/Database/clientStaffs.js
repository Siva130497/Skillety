const { Schema, model } = require("mongoose");

const clientStaff = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    companyName: {
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
    clientId: {
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

module.exports = model("clientStaff", clientStaff);
