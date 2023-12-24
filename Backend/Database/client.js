const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      unique: true
    },
    count: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['Client']
    }
  },
  { timestamps: true }
);

module.exports = model("Client", clientSchema);
