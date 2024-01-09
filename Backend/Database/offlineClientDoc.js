const { Schema, model } = require("mongoose");

const offlineClientDocSchema = new Schema(
  {
    clientId: {
      type: String,
    },
    doc: {
        type:String,
    },
  },
  { timestamps: true }
);

module.exports = model("offlineClientDoc", offlineClientDocSchema);
