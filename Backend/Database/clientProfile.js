const { Schema, model } = require("mongoose");

const ClientImageSchema = new Schema(
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

module.exports = model("clientImg", ClientImageSchema);
