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
    clientId: String,  
    clientStaffId: String,  
    companyId: String,  
    recruiterId: String, 
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

appliedJobSchema.pre('save', function(next) {
  if (!this.clientId && !this.clientStaffId && !this.companyId && !this.recruiterId) {
    next(new Error('At least one of the following fields is required: clientId, clientStaffId, companyId, recruiterId'));
  } else {
    next();
  }
});

module.exports = model("appliedJob", appliedJobSchema);
