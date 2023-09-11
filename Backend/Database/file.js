const { Schema, model } = require("mongoose");

const FileSchema = new Schema(
  {
    id:String,
    filename: String,
    data: Buffer,
  },
  { timestamps: true }
);

module.exports = model("file", FileSchema);
