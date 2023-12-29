const { Schema, model } = require("mongoose");

const TempClient = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique : true
    },
    industry: {
      type: String,
      required: function() {
        return this.role === 'Client';
      }
    },
    phone: {
      type: Number,
      required: true,
      unique : true
    },
    count: {
        type: Number,
        required: function() {
          return this.role === 'Client';
        }
    },
    companyName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: function() {
          return this.role === 'Client';
        }
    },
    // tempPassword: {
    //     type: String,
    //     required: true
    // },
    url: {
        type: String,
        required: true
    },
    id: {
      type: String,
      unique : true,
      required: true
    },
    companyId: {
      type: String,
      required: function() {
        return this.role === 'Client-staff';
      }
    },
    role: {
      type: String,
      required: true,
      enum: ['Client', 'Client-staff']
    },
  },
  { timestamps: true }
);

module.exports = model("TempClient", TempClient);
