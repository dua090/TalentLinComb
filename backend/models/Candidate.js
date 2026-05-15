const mongoose =
  require("mongoose");

// ================= CANDIDATE SCHEMA =================

const candidateSchema =
  new mongoose.Schema(

    {
      // ================= BASIC INFO =================

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      // ================= SKILLS =================

      skills: {
        type: [String],
        required: true,
        default: [],
      },

      // ================= EXPERIENCE =================

      experience: {
        type: Number,
        required: true,
        default: 0,
      },

      // ================= EDUCATION =================

      education: {
        type: [String],
        default: [],
      },

      // ================= PROJECTS =================

      projects: {
        type: [String],
        default: [],
      },

      // ================= RESUME =================

      resumeUrl: {
        type: String,
        default: "",
      },

      // ================= VECTOR EMBEDDING =================

      embedding: {
        type: [Number],
        default: [],
      },

      // ================= SOURCE =================

      source: {
        type: String,

        enum: [
          "ai",
          "manual",
        ],

        default: "ai",

        required: true,
      },

      // ================= BOOKMARK =================

      isBookmarked: {
        type: Boolean,
        default: false,
      },

      // ================= MULTI TENANCY =================

      organizationId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Organization",

        required: true,

        index: true,
      },

      // ================= FUTURE WORKFORCE AI =================

      availabilityStatus: {

        type: String,

        enum: [
          "available",
          "partially_available",
          "busy",
        ],

        default:
          "available",
      },

      currentAllocation: {

        type: Number,

        default: 0,
      },
    },

    {
      timestamps: true,
    }
  );

// ================= INDEXES =================

// MULTI-TENANT SEARCH OPTIMIZATION

candidateSchema.index({

  organizationId: 1,

  createdAt: -1,
});

// SKILL SEARCH OPTIMIZATION

candidateSchema.index({

  skills: 1,
});

// EXPERIENCE FILTERING

candidateSchema.index({

  experience: 1,
});

// ================= EXPORT =================

module.exports =
  mongoose.model(

    "Candidate",

    candidateSchema
  );