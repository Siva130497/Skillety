const { Schema, model } = require("mongoose");

const clientLogoWebSchema = new Schema(
  {
    logoStringBase64: {
        type: String,
        required: true
    }
    },
    { timestamps: true }
);

module.exports = model("clientLogoWeb", clientLogoWebSchema);
