const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true
    },

    jobType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Contract",
        "Remote"
      ],
      default: "Full Time"
    },

    salary: {
      type: String,
      default: "Not specified"
    },

    category: {
      type: String,
      default: "Other"
    },

    description: {
      type: String,
      required: true
    },

    requirements: {
      type: [String],
      default: []
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Job", jobSchema);
