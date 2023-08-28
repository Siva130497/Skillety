const { Schema, model } = require("mongoose");

const resumeSchema = new Schema(
  {
    id: {
      type: String,
    },
    file: {
        type:String,
    },
  },
  { timestamps: true }
);

module.exports = model("resume", resumeSchema);
