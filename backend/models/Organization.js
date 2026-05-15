const mongoose =
  require("mongoose");

// ================= ORGANIZATION SCHEMA =================

const organizationSchema =
  new mongoose.Schema(

    {
      // ================= BASIC INFO =================

      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },

      // ================= SUBSCRIPTION PLAN =================

      plan: {

        type: String,

        enum: [

          "starter",

          "growth",

          "enterprise",
        ],

        default:
          "starter",
      },

      // ================= ORGANIZATION STATUS =================

      isActive: {

        type: Boolean,

        default: true,
      },

      // ================= COMPANY DETAILS =================

      website: {

        type: String,

        default: "",
      },

      industry: {

        type: String,

        default: "",
      },

      companySize: {

        type: Number,

        default: 0,
      },

      // ================= BRANDING =================

      logo: {

        type: String,

        default: "",
      },

      // ================= WORKFORCE AI METADATA =================

      totalEmployees: {

        type: Number,

        default: 0,
      },

      totalProjects: {

        type: Number,

        default: 0,
      },
    },

    {
      timestamps: true,
    }
  );

// ================= INDEXES =================

// SLUG LOOKUP

organizationSchema.index({

  slug: 1,
});

// PLAN FILTERING

organizationSchema.index({

  plan: 1,
});

// ================= EXPORT =================

module.exports =
  mongoose.model(

    "Organization",

    organizationSchema
  );