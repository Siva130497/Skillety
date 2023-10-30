const { Schema, model } = require("mongoose");

const enquiryFormSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNo: {
      type: Number,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    location: {
        type: String,
        required: true
    },
    rpoModel: {
        type: String,
        required: true
    },
    positionCount: {
        type: Number,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    premisesType: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);

module.exports = model("enquiryForm", enquiryFormSchema);
