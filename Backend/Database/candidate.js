const { Schema, model } = require("mongoose");

const candidateSchema = new Schema(
  {
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
    password: {
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
    }
    },
    { timestamps: true }
);

module.exports = model("Candidate", candidateSchema);
