const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    id: {
      type: String,
    },
    image: {
        type:String,
    },
  },
  { timestamps: true }
);

module.exports = model("image", imageSchema);
