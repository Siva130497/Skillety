const { Schema, model } = require("mongoose");

const webContentSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    
    },
    { timestamps: true }
);

module.exports = model("webContent", webContentSchema);
