const { Schema, model } = require("mongoose");

const sampleImgSchema = new Schema(
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

module.exports = model("sampleImg", sampleImgSchema);
