const { Schema, model } = require("mongoose");

const jobDetailSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    jobRole: {
        type: Array,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    additionalSkills: {
        type: Array,
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
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
    },
    { timestamps: true }
);

module.exports = model("jobDetail", jobDetailSchema);
