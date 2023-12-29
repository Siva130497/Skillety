const { Schema, model } = require("mongoose");

const candidateCreateSchema = new Schema(
  {
    recruiterId: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    designation: {
        type: Array,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
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
    preferedlocations: {
        type: Array,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    profileHeadline: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    selectedDate: {
        type: String,
    },
    skills: {
        type: Array,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    checkbox: {
        type: Boolean,
    },
    role: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
    },
    { timestamps: true }
);

module.exports = model("candidateCreate", candidateCreateSchema);
