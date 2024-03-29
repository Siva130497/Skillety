const { Schema, model } = require("mongoose");

const clientPackageSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    packageType: {
      type: String,
      required: true
    },
    logins: {
      type: Number,
      required: true
    },
    loginsRemaining: {
      type: Number,
      required: true
    },
    cvViews: {
        type: Number,
        required: true
      },
    cvViewsRemaining: {
        type: Number,
        required: true
      },
    activeJobs: {
        type: Number,
        required: true
      },
    activeJobsRemaining: {
        type: Number,
        required: true
      },
    validity: {
        type: Number,
        required: true
      },
    amount: {
        type: String,
        required: true
      },
    realPrice: {
        type: String,
        required: true
      }, 
    offerPrice: {
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
    boughtDate: {
        type: String,
        required: true
      },
    expiryDate: {
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

module.exports = model("clientPackage", clientPackageSchema);
