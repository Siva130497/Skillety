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
    managerId: String,
    jobRole: {
        type: Array,
        required: true
    },
    jobMandatorySkills: {
        type: Array,
        required: true
    },
    jobExperience: {
        type: String,
        required: true
    },
    jobLocation: {
        type: Array,
        required: true
    },
    jobDepartment: {
        type: Array,
        required: true
    },
    role: {
        type: Array,
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
    salary: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    workMode: {
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
  if (!this.clientId && !this.clientStaffId && !this.companyId && !this.recruiterId && !this.managerId) {
    next(new Error('At least one of the following fields is required: clientId, clientStaffId, companyId, recruiterId, managerId'));
  } else {
    next();
  }
});

module.exports = model("appliedJob", appliedJobSchema);
