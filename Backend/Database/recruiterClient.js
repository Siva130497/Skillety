const { Schema, model } = require("mongoose");

const recruiterClientSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    companyId: {
      type: String,
      required: true
    },
    recruiterId: {
        type: String,
        required: true
      },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      unique: true
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
    role: {
      type: String,
      required: true,
      enum: ['Client']
    }
  },
  { timestamps: true }
);

module.exports = model("recruiterClient", recruiterClientSchema);
