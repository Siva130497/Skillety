const { Schema, model } = require("mongoose");

const CandidateImageSchema = new Schema(
  {
    id: {
      type: String,
    },
    image: {
        type:String,
    },
  },
  { timestamps: true }
);

module.exports = model("candidateImg", CandidateImageSchema);
