const { Schema, model } = require("mongoose");

// Custom validator function
const validServiceNames = {
  validator: function(value) {
    const validNames = ["CV Views", "Login IDs", "Job Postings"];
    return value.every(name => validNames.includes(name));
  },
  message: props => `${props.value} is not a valid service name`
};

const skilletyServiceSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    serviceNames: {
      type: [String],
      required: true,
      validate: validServiceNames
    },
    quantities: {
      cvViews: {
        type: Number,
        required: true
      },
      logins: {
        type: Number,
        required: true
      },
      activeJobs: {
        type: Number,
        required: true
      }
    },
    remainings: {
      cvViews: {
        type: Number,
        required: true
      },
      logins: {
        type: Number,
        required: true
      },
      activeJobs: {
        type: Number,
        required: true
      }
    },
    validity: {
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
    discount: {
      type: String,
      required: true
    }, 
    discountAmount: {
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
    },
    boughtDate: {
      type: String,
      required: true
    },
    expiryDate: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("skilletyService", skilletyServiceSchema);
