const { Schema, model } = require("mongoose");

const mediaDetailSchema = new Schema(
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
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: function() {
        return ["blog", "video", "podcast", "news"].includes(this.type);
      }
    },
    type: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = model("mediaDetail", mediaDetailSchema);
