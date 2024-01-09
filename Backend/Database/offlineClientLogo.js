const { Schema, model } = require("mongoose");

const offlineClientLogoSchema = new Schema(
  {
    clientId: {
      type: String,
    },
    logo: {
        type:String,
    },
  },
  { timestamps: true }
);

module.exports = model("offlineClientLogo", offlineClientLogoSchema);
