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
    phone: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      enum: ["Recruiter", "Admin"]
    },
    companyStaff: {
      type: String,
      required: function() {
        return ["Recruiter"].includes(this.role);
      }
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("employee", employeeSchema);
