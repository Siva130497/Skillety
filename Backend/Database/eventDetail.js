const { Schema, model } = require("mongoose");

const eventDetailSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    recruiterId: {
        type: String,
        required: true
      },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = model("eventDetail", eventDetailSchema);
