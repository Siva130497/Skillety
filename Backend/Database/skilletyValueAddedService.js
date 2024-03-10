const { Schema, model } = require("mongoose");

const skilletyValueAddedServiceSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    serviceName: {
      type: String,
      required: true,
      enum: ["OnlineTechnicalAssessment", "L1Interview(0to8yrs)", "L1Interview(8to15yrs)", "L1Interview(>15yrs)", "BGVComprehensive"]
    },
    quantity: {
      type: Number,
      required: true
    },
    remaining: {
      type: Number,
      required: true
    },
    servicePrice: {
        type: String,
        required: true
      },
    finalAmount: {
        type: String,
        required: true
      },
    GST: {
        type: String,
        required: true
      },
    GSTAmount: {
        type: String,
        required: true
      },
    status: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("skilletyValueAddedService", skilletyValueAddedServiceSchema);
