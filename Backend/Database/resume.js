const { Schema, model } = require("mongoose");

const resumeSchema = new Schema(
  {
    id: {
      type: String,
      required:true
    },
    file: {
        type:String,
        required:true
    },
  },
  { timestamps: true }
);

module.exports = model("resume", resumeSchema);
