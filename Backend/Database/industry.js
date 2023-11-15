const { Schema, model } = require("mongoose");

const industrySchema = new Schema(
  {
    industry:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("industry", industrySchema);
