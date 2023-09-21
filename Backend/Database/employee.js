const { Schema, model } = require("mongoose");

const employeeSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["Recruiter", "Admin"]
    },
    companyStaff: {
      type: String,
      required:true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("employee", employeeSchema);
