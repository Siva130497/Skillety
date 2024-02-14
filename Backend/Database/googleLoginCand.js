const { Schema, model } = require("mongoose");

const googleLoginCandSchema = new Schema(
  {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    },
    { timestamps: true }
);

module.exports = model("googleLoginCand", googleLoginCandSchema);
