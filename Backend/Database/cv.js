const { Schema, model } = require("mongoose");

const ResumeSchema = new Schema(
  {
    id:String,
    filename: String,
    base64Data: String,
  },
  { timestamps: true }
);

module.exports = model("cv", ResumeSchema);
