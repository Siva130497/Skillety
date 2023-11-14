const { Schema, model } = require("mongoose");

const clientPackageSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    packageType: {
      type: String,
      required: true
    },
    logins: {
      type: Number,
      required: true
    },
    cvViews: {
        type: Number,
        required: true
      },
      jobPost: {
        type: Number,
        required: true
      },
  },
  { timestamps: true }
);

module.exports = model("clientPackage", clientPackageSchema);
