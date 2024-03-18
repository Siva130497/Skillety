const { Schema, model } = require("mongoose");

const companyJobSchema = new Schema(
  {
    companyId: {
      type: String,
      required: true
    },
    jobId: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = model("companyJob", companyJobSchema);
