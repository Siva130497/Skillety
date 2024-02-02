const { Schema, model } = require("mongoose");

const searchResultSchema = new Schema(
  {
    days: {
        type: String,
    },
    selectedResults: {
        type: Array,
    },
    selectedLocationResults: {
        type: Array,
    },
    minExperienceYr: {
        type: String, 
    },
    minExperienceMonth: {
        type: String,
    },
    maxExperienceYr: {
        type: String,
    },
    maxExperienceMonth: {
        type: String,
    },
    minSalary: {
        type: String,
    },
    maxSalary: {
        type: String,
    },
    selectedEducationResults: {
        type: Array,
    },
    selectedRoleResults: {
        type: Array,
    },
    industry: {
        type: Array,
    },
    company: {
        type: String,
    },
    // candidateType: {
    //     type: String,
    // },
    // gender: {
    //     type: String,
    // }
    },
    { timestamps: true }
);

module.exports = model("searchResult", searchResultSchema);
