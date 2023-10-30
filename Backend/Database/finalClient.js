const { Schema, model } = require("mongoose");

const finalClient = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique : true,
      required: true
    },
    industry: {
      type: String,
      required: function() {
        return this.role === 'Client';
      }
    },
    phone: {
      type: Number,
      unique : true,
      required: true
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
    password: {
        type: String,
        required: true
    },
    id: {
      type: String,
      required: true,
      unique : true
    },
    companyId: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['Client', 'Client-staff']
  },
  },
  { timestamps: true }
);

module.exports = model("FinalClient", finalClient);
