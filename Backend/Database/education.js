const { Schema, model } = require("mongoose");

const educationSchema = new Schema(
  {
    education:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("education", educationSchema);
