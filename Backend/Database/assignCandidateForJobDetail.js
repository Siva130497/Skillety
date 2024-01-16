const { Schema, model } = require("mongoose");

const assignCandidateForJobDetailSchema = new Schema(
  {
    jobId: {
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

module.exports = model("assignCandidateForJobDetail", assignCandidateForJobDetailSchema);
