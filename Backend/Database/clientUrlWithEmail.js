const { Schema, model } = require("mongoose");

const clientUrlWithEmailSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    url: {
      type: Array,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("clientUrlWithEmail", clientUrlWithEmailSchema);
