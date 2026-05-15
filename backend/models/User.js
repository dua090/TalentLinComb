const mongoose =
  require("mongoose");

// ======================================================
// ================= USER SCHEMA =========================
// ======================================================

const userSchema =
  new mongoose.Schema(

    {
      // ======================================================
      // ================= ORGANIZATION =======================
      // ======================================================

      organizationId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Organization",

        required: true,

        index: true,
      },

      // ======================================================
      // ================= BASIC INFO =========================
      // ======================================================

      name: {

        type: String,

        required: true,

        trim: true,
      },

      email: {

        type: String,

        required: true,

        unique: true,

        trim: true,

        lowercase: true,
      },

      password: {

        type: String,

        required: true,
      },

      // ======================================================
      // ================= ROLE ===============================
      // ======================================================

      role: {

        type: String,

        enum: [

          "organization_admin",

          "recruiter",

          "manager",

          "employee",
        ],

        default:
          "organization_admin",
      },

      // ======================================================
      // ================= PERMISSIONS ========================
      // ======================================================

      permissions: {

        type: [String],

        default: [],
      },

      // ======================================================
      // ================= STATUS =============================
      // ======================================================

      isActive: {

        type: Boolean,

        default: true,
      },

      // ======================================================
      // ================= FUTURE WORKFORCE AI ================
      // ======================================================

      designation: {

        type: String,

        default: "",
      },

      department: {

        type: String,

        default: "",
      },
    },

    {
      timestamps: true,
    }
  );

// ======================================================
// ================= INDEXES =============================
// ======================================================

// MULTI-TENANT USER LOOKUP

userSchema.index({

  organizationId: 1,

  email: 1,
});

// ROLE FILTERING

userSchema.index({

  role: 1,
});

// PERMISSION FILTERING

userSchema.index({

  permissions: 1,
});

// ======================================================
// ================= EXPORT ==============================
// ======================================================

module.exports =
  mongoose.model(

    "User",

    userSchema
  );