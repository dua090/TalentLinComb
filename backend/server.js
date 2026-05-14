require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const aiRoutes =
  require(
    "./routes/aiRoutes"
  );

connectDB();

app.listen(5000, () => console.log("Server running"));

app.use(
  "/api/ai",
  aiRoutes
);