const { Schema, model } = require("mongoose");

const createdClientsTableSchema = new Schema(
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

module.exports = model("createdClientsTable", createdClientsTableSchema);
