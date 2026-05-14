const express =
  require("express");

const router =
  express.Router();

const {
  generateCandidateSummary,
} = require(
  "../controllers/aiController"
);

router.post(
  "/candidate-summary",
  generateCandidateSummary
);

module.exports =
  router;