const { Schema, model } = require("mongoose");

const selectedCandidateForJobSchema = new Schema(
  {
    candidateId: {
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

module.exports = model("selectedCandidateForJobS", selectedCandidateForJobSchema);
