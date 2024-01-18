const { Schema, model } = require("mongoose");

const offlineCandSchema = new Schema(
  {
    candId: {
      type: String,
      unique: true,
      required: true
    },
    managerId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: (value) => value >= 0, 
        message: "Mobile number must be a non-negative number!",
      },
    }
  },
  { timestamps: true }
);

module.exports = model("offlineCand", offlineCandSchema);
