const { Schema, model } = require("mongoose");

const bookEventDetailSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNo: {
      type: Number,
      required: true
    },
    bookingEventId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("bookEventDetail", bookEventDetailSchema);
