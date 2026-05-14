const router =
  require("express").Router();

const multer =
  require("multer");

const path =
  require("path");

const auth =
  require(
    "../middleware/authMiddleware"
  );

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

// ================= MULTER STORAGE =================

const storage =
  multer.diskStorage({

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

    filename:
      (
        req,
        file,
        cb
      ) => {

        const uniqueName =

          Date.now() +

          path.extname(
            file.originalname
          );

        cb(
          null,
          uniqueName
        );
      },
  });

// ================= MULTER =================

const upload =
  multer({

    storage,

    limits: {

      fileSize:
        5 *
        1024 *
        1024,
    },
  });

// ================= ROUTES =================

// Upload Resume

router.post(

  "/upload",

  auth,

  upload.single(
    "resume"
  ),

  uploadResume
);

// Manual Candidate Add

router.post(

  "/manual",

  auth,

  addCandidateManual
);

// Basic Search

router.get(

  "/search",

  auth,

  searchCandidates
);

// AI Smart Search

router.post(

  "/smart-search",

  auth,

  smartSearch
);

// Get All Candidates

router.get(

  "/",

  auth,

  getCandidates
);

// Bookmark Candidate

router.patch(

  "/:id/bookmark",

  toggleBookmark
);

module.exports =
  router;