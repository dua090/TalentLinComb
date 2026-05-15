const router =
  require("express").Router();

const multer =
  require("multer");

const path =
  require("path");

// ======================================================
// ================= MIDDLEWARE =========================
// ======================================================

const auth =
  require(
    "../middleware/authMiddleware"
  );

const allowPermissions =
  require(
    "../middleware/permissionMiddleware"
  );

// ======================================================
// ================= CONTROLLERS ========================
// ======================================================

const {
  smartSearch,
} = require(
  "../controllers/searchController"
);

const {

  uploadResume,

  searchCandidates,

  getCandidates,

  addCandidateManual,

  toggleBookmark,

} = require(
  "../controllers/candidateController"
);

// ======================================================
// ================= MULTER STORAGE =====================
// ======================================================

const storage =
  multer.diskStorage({

    // ======================================================
    // ================= DESTINATION ========================
    // ======================================================

    destination:
      (
        req,
        file,
        cb
      ) => {

        cb(
          null,
          "uploads/"
        );
      },

    // ======================================================
    // ================= FILENAME ===========================
    // ======================================================

    filename:
      (
        req,
        file,
        cb
      ) => {

        const uniqueName =

          `${Date.now()}-${Math.round(
            Math.random() * 1e9
          )}` +

          path.extname(
            file.originalname
          );

        cb(
          null,
          uniqueName
        );
      },
  });

// ======================================================
// ================= FILE FILTER ========================
// ======================================================

const fileFilter =
  (
    req,
    file,
    cb
  ) => {

    if (

      file.mimetype ===
      "application/pdf"

    ) {

      cb(
        null,
        true
      );

    } else {

      cb(

        new Error(
          "Only PDF files are allowed"
        ),

        false
      );
    }
  };

// ======================================================
// ================= MULTER =============================
// ======================================================

const upload =
  multer({

    storage,

    fileFilter,

    limits: {

      fileSize:
        5 *
        1024 *
        1024,
    },
  });

// ======================================================
// ================= CANDIDATE ROUTES ===================
// ======================================================

// ======================================================
// ================= UPLOAD RESUME ======================
// ======================================================

router.post(

  "/upload",

  auth,

  allowPermissions(
    "upload_profiles"
  ),

  upload.single(
    "resume"
  ),

  uploadResume
);

// ======================================================
// ================= MANUAL ADD =========================
// ======================================================

router.post(

  "/manual",

  auth,

  allowPermissions(
    "upload_profiles"
  ),

  addCandidateManual
);

// ======================================================
// ================= BASIC SEARCH =======================
// ======================================================

router.get(

  "/search",

  auth,

  allowPermissions(
    "talent_pool"
  ),

  searchCandidates
);

// ======================================================
// ================= AI SMART SEARCH ====================
// ======================================================

router.post(

  "/smart-search",

  auth,

  allowPermissions(
    "talent_pool"
  ),

  smartSearch
);

// ======================================================
// ================= GET ALL CANDIDATES ================
// ======================================================

router.get(

  "/",

  auth,

  allowPermissions(
    "talent_pool"
  ),

  getCandidates
);

// ======================================================
// ================= BOOKMARK ===========================
// ======================================================

router.patch(

  "/:id/bookmark",

  auth,

  allowPermissions(
    "talent_pool"
  ),

  toggleBookmark
);

// ======================================================
// ================= EXPORT =============================
// ======================================================

module.exports =
  router;