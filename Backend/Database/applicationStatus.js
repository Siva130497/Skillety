const { Schema, model } = require("mongoose");

const applicationStatusSchema = new Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    candidateId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = model("applicationStatus", applicationStatusSchema);
