const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    specialty: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    degree: {
      type: String,
    },

    clinicAddress: {
      type: String,
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Doctor",
  doctorSchema
);