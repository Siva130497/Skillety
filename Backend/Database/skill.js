const { Schema, model } = require("mongoose");

const skillSchema = new Schema(
  {
    skill:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("skill", skillSchema);
