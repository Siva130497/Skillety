const { Schema, model } = require("mongoose");

const appliedJobSchema = new Schema(
  {
    jobId: {
        type: String,
        required: true
    },
    candidateId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    jobRole: {
        type: Array,
        required: true
    },
    jobMandatorySkills: {
        type: Array,
        required: true
    },
    jobAdditionalSkills: {
        type: Array,
    },
    jobExperience: {
        type: String,
        required: true
    },
    jobCategory: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
},
    { timestamps: true }
);

module.exports = model("appliedJob", appliedJobSchema);
