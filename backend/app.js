const express =
  require("express");

const cors =
  require("cors");

const app =
  express();

// ======================================================
// ================= ROUTES =============================
// ======================================================

const authRoutes =
  require(
    "./routes/authRoutes"
  );

const candidateRoutes =
  require(
    "./routes/candidateRoutes"
  );

const analyticsRoutes =
  require(
    "./routes/analyticsRoutes"
  );

const userRoutes =
  require(
    "./routes/userRoutes"
  );

const aiRoutes =
  require(
    "./routes/aiRoutes"
  );

// ======================================================
// ================= MIDDLEWARE =========================
// ======================================================

app.use(cors());

app.use(express.json());

// ======================================================
// ================= API ROUTES =========================
// ======================================================

// AUTH

app.use(

  "/api/auth",

  authRoutes
);

// CANDIDATES

app.use(

  "/api/candidates",

  candidateRoutes
);

// ANALYTICS

app.use(

  "/api/analytics",

  analyticsRoutes
);

// USERS

app.use(

  "/api/users",

  userRoutes
);

// AI

app.use(

  "/api/ai",

  aiRoutes
);

// ======================================================
// ================= EXPORT =============================
// ======================================================

module.exports =
  app;