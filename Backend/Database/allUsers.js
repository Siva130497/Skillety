const { Schema, model } = require("mongoose");

const allUsersSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique : true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique : true
    },
    phone: {
      type: Number,
      required: true,
      unique : true
    },
    role: {
      type: String,
      enum: ["Client", "Candidate", "Recruiter", "Admin", "Client-staff"]
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("allUsers", allUsersSchema);
