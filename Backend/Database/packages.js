const { Schema, model } = require("mongoose");

const packageSchema = new Schema(
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
    cvViews: {
        type: Number,
        required: true
      },
    activeJobs: {
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
        type: Number,
        required: true
      },  
    status: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("package", packageSchema);
