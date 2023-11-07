const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
  {
    location:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("location", locationSchema);
