const { Schema, model } = require("mongoose");

const skilletyServiceSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    serviceName: {
      type: String,
      required: true,
      enum: ["CVViews", "LoginIDs", "JobPostings"]
    },
    quantity: {
      type: Number,
      required: true
    },
    remaining: {
      type: Number,
      required: true
    },
    validity: {
        type: Number,
        required: true
      },
    servicePrice: {
        type: String,
        required: true
      },
    finalAmount: {
        type: String,
        required: true
      },
    discount: {
        type: String,
        required: true
      }, 
    discountAmount: {
        type: String,
        required: true
      },
    GST: {
        type: String,
        required: true
      },
    GSTAmount: {
        type: String,
        required: true
      },
    status: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("skilletyService", skilletyServiceSchema);
