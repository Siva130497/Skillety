const { Schema, model } = require("mongoose");

const offlineClientSchema = new Schema(
  {
    clientId: {
      type: String,
      unique: true,
      required: true
    },
    managerId: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    companyWebsite: {
      type: String,
      required: true
    },
    contactPerson: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobile: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0, 
        message: "Mobile number must be a non-negative number!",
      },
    },
    industry: {
      type: Array,
      required: true
    },
    headCount: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0, 
        message: "Head count must be a non-negative number!",
      },
    },
    aboutClient: {
      type: String,
      required: true
    },
    GSTNumber: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0, 
        message: "GST number must be a non-negative number!",
      },
    },
    CINNumber: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0, 
        message: "CIN number must be a non-negative number!",
      },
    },
    paymentCategory : {
      type: String,
      enum: ["NEFT/RTGS", "Cheque"],
      required: true
    },
    paymentTerms: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true, 
        message: "Payment terms must be true.",
      },
    },
  },
  { timestamps: true }
);

// Creating a compound unique index
offlineClientSchema.index({ companyName: 1, email: 1, mobile: 1 }, { unique: true });

module.exports = model("offlineClient", offlineClientSchema);
