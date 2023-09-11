const { Schema, model } = require("mongoose");

const designationSchema = new Schema(
  {
    designation:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("designation", designationSchema);
