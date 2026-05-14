require("dotenv").config();

const express =
  require("express");

const app =
  require("./app");

const connectDB =
  require("./config/db");

const aiRoutes =
  require(
    "./routes/aiRoutes"
  );

// ================= DB =================

connectDB();

// ================= STATIC FILES =================

app.use(
  "/uploads",
  express.static("uploads")
);

// ================= AI ROUTES =================

app.use(
  "/api/ai",
  aiRoutes
);

// ================= SERVER =================

app.listen(
  5000,
  () =>
    console.log(
      "Server running on port 5000"
    )
);