const { Schema, model } = require("mongoose");

const allJobTableSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    column: {
        type: Array,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = model("allJobTable", allJobTableSchema);
