const { Schema, model } = require("mongoose");

const nonApprovalJobTableSchema = new Schema(
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

module.exports = model("nonApprovalJobTable", nonApprovalJobTableSchema);
