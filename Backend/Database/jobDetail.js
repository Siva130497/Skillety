const { Schema, model } = require("mongoose");

const jobDetailSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: function() {
            return this.Role === 'Client' || this.Role === 'Manager';
        } 
    },
    recruiterId: {
        type: String,
        required: function() {
            return this.Role === 'Recruiter';
          }
    },
    managerId: {
        type: String,
        required: function() {
            return this.Role === 'Manager';
          }
    },
    clientStaffId: {
        type: String,
        required: function() {
            return this.Role === 'Client-staff';
        } 
    },
    companyId: {
        type: String,
        required: function() {
            return this.Role === 'Client' || this.Role === 'Client-staff';
        } 
    },
    jobRole: {
        type: Array,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    location: {
        type: Array,
        required: true
    },
    department: {
        type: Array,
        required: true
    },
    role: {
        type: Array,
        required: true
    },
    minExperience: {
        type: Number,
        required: true
    },
    maxExperience: {
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
    currencyType: {
        type: String,
        required: true
    },
    minSalary: {
        type: String,
        required: true
    },
    maxSalary: {
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
    },
    { timestamps: true }
);

module.exports = model("jobDetail", jobDetailSchema);
