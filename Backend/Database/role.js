const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    role:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("role", roleSchema);
