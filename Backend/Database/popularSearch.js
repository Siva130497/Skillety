const { Schema, model } = require("mongoose");

const popularSearchSchema = new Schema(
  {
    keyword:{
        type: String,
    },
    times:{
        type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("popularSearch", popularSearchSchema);
