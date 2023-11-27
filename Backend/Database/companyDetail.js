const { Schema, model } = require("mongoose");

const companyDetailSchema = new Schema(
  {
    email: {
      type: String,
      unique : true,
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      unique : true,
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
    companyId: {
      type: String,
      required: true
    },
    location: {
        type: String,
    },
    shortDescription: {
        type: String,
    },
    longDescription: {
        type: String,
    },
    mission: {
        type: String,
    },
    vision: {
        type: String,
    },
    benefits: {
        type: Array,
    },
    awards: {
        type: Array,
    },
    website: {
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("companyDetail", companyDetailSchema);
