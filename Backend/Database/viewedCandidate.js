const { Schema, model } = require("mongoose");

const viewedCandidateSchema = new Schema(
  {
    companyId: {
      type: String,
      required: true
    },
    candidateId: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = model("viewedCandidate", viewedCandidateSchema);
