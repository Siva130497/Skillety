const { Schema, model } = require("mongoose");

const allUsersSchema = new Schema(
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
      enum: ["Client", "Candidate", "Recruiter", "Admin"]
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("allUsers", allUsersSchema);