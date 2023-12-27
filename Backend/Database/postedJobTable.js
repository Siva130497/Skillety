const { Schema, model } = require("mongoose");

const postedJobTableSchema = new Schema(
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

module.exports = model("postedJobTable", postedJobTableSchema);
