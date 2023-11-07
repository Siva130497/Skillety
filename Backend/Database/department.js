const { Schema, model } = require("mongoose");

const departmentSchema = new Schema(
  {
    department:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("department", departmentSchema);
